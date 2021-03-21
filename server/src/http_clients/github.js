const fetch = require('node-fetch');
const GraphQLError = require('../errors');

const BaseHttpClient = require('./base');

class GithubHttpClient extends BaseHttpClient {
  constructor() {
    super('https://api.github.com');
    this.headers = new fetch.Headers();
    this.headers.append('Authorization', `Bearer ${process.env.GITHUB_TOKEN}`);
  }

  /**
   * Performs a graphql request
   * @param {string} query Query string for grapql api
   * @param {Record<string, string | number>} variables Variables used in query
   * @returns {Promise<Response>}
   */
  graphqlRequest(query, variables = {}) {
    const body = JSON.stringify({
      query,
      variables,
    });

    return this.request('/graphql', 'POST', body, this.headers);
  }

  /**
   * Retrieves all the comments of a pull request
   * @param {string} repoOwner Name of the repository owner
   * @param {string} repoName Name of the repository
   * @param {number} pullRequestNumber Pull request number
   */
  async getPullRequestComments(repoOwner, repoName, pullRequestNumber) {
    const commentsQuery = `
      comments(first: 100) {
        nodes {
          databaseId
          ...commentFields
        }
      }
    `;
    const query = `
      query ($repoOwner: String!, $repoName:String!, $pullRequestNumber: Int!) {
        repository(owner: $repoOwner, name: $repoName) {
          databaseId
          pullRequest(number: $pullRequestNumber) {
            databaseId
            ${commentsQuery}
            reviewThreads(first: 100) {
              nodes {
                ${commentsQuery}
              }
            }
            reviews(first: 100) {
              nodes {
                ${commentsQuery}
              }
            }
          }
        }
        rateLimit {
          remaining
          cost
        }
      }

      fragment commentFields on Comment {
        createdAt
        author {
          login
        }
      }
    `;
    const variables = {
      repoOwner,
      repoName,
      pullRequestNumber,
    };

    const resp = await this.graphqlRequest(query, variables);
    const respJson = await resp.json();
    if (respJson.errors) {
      throw new GraphQLError(JSON.stringify(respJson.errors));
    }

    const { data } = respJson;
    const { rateLimit } = data;
    const { pullRequest, databaseId: repoDatabaseId } = data.repository;
    const {
      comments,
      reviewThreads,
      reviews,
      databaseId: pullRequestDatabaseId,
    } = pullRequest;
    let allCommentNodes = [...comments.nodes];
    reviewThreads.nodes.forEach(({ comments: reviewComments }) => {
      reviewComments.nodes.forEach((comment) => allCommentNodes.push(comment));
    });
    reviews.nodes.forEach(
      ({ databaseId, createdAt, author, comments: reviewComments }) => {
        allCommentNodes.push({
          databaseId,
          createdAt,
          author,
        });
        reviewComments.nodes.forEach((comment) => {
          allCommentNodes.push(comment);
        });
      }
    );

    const set = new Set();
    allCommentNodes = allCommentNodes.filter(
      ({ databaseId: commentDatabaseId }) => {
        const hasDuplicate = set.has(commentDatabaseId);
        set.add(commentDatabaseId);

        return !hasDuplicate;
      }
    );

    return {
      repository: {
        databaseId: repoDatabaseId,
        pullRequest: {
          databaseId: pullRequestDatabaseId,
          comments: {
            nodes: allCommentNodes,
          },
        },
      },
      rateLimit,
    };
  }

  /**
   * Retrieves a list of pull request numbers
   * @param {string} repoOwner Name of the repository owner
   * @param {string} repoName Name of the repository
   * @param {number} iterationLimit Limit of iterations during pagenation
   * @param {string} startCursor Last synced cursor
   */
  async getPullRequestNumbers(
    repoOwner,
    repoName,
    iterationLimit,
    startCursor
  ) {
    const query = `
      query ($repoOwner: String!, $repoName: String!, $cursor: String) {
        repository(owner: $repoOwner, name: $repoName) {
          pullRequests(first: 100, after: $cursor) {
            nodes {
              number
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
        rateLimit {
          remaining
          cost
        }
      }
    `;
    const variables = {
      repoOwner,
      repoName,
      cursor: startCursor,
    };

    const nodes = [];
    const rateLimit = {
      remaining: null,
      cost: 0,
    };

    let iterations = 0;
    let hasNextPage = true;
    while (hasNextPage && iterations < iterationLimit) {
      // eslint-disable-next-line no-await-in-loop
      const resp = await this.graphqlRequest(query, variables);
      // eslint-disable-next-line no-await-in-loop
      const respJson = await resp.json();
      if (respJson.errors) {
        throw new GraphQLError(JSON.stringify(respJson.errors));
      }

      const { rateLimit: currentRateLimit, repository } = respJson.data;
      const { pullRequests } = repository;
      const { pageInfo } = pullRequests;

      rateLimit.remaining = currentRateLimit.remaining;
      rateLimit.cost += currentRateLimit.cost;

      pullRequests.nodes.forEach((node) => nodes.push(node));

      hasNextPage = pageInfo.hasNextPage;
      variables.cursor = pageInfo.endCursor;

      iterations += 1;
    }

    return {
      repository: {
        pullRequests: {
          nodes,
        },
        rateLimit,
      },
    };
  }
}

const instance = new GithubHttpClient();
Object.freeze(instance);

module.exports = instance;
