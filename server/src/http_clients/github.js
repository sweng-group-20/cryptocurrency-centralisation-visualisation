const fetch = require('node-fetch');
const GraphQLError = require('../errors');

const BaseHttpClient = require('./base');

class GithubHttpClient extends BaseHttpClient {
  constructor() {
    super('https://api.github.com');
    this.headers = new fetch.Headers();
    this.headers.set('Authorization', `Bearer ${process.env.GITHUB_TOKEN}`);
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
            number
            state
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
      number,
      state,
      databaseId: pullRequestDatabaseId,
    } = pullRequest;
    let allCommentNodes = [...comments.nodes];
    reviewThreads.nodes.forEach(({ comments: reviewComments }) =>
      reviewComments.nodes.forEach((comment) => allCommentNodes.push(comment))
    );
    reviews.nodes.forEach(({ comments: reviewComments }) =>
      reviewComments.nodes.forEach((comment) => {
        allCommentNodes.push(comment);
      })
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
          number,
          state,
          databaseId: pullRequestDatabaseId,
          comments: {
            nodes: allCommentNodes,
          },
        },
      },
      rateLimit,
    };
  }

  async getIssueComments(repoOwner, repoName, issueNumber) {
    const query = `
      query ($repoOwner: String!, $repoName: String!, $issueNumber: Int!, $cursor: String) {
        repository(owner: $repoOwner, name: $repoName) {
          databaseId
          issue(number: $issueNumber) {
            databaseId
            number
            state
            comments(first: 100, after: $cursor) {
              nodes {
                databaseId
                createdAt
                author {
                  login
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
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
      issueNumber,
    };

    const repository = {
      databaseId: null,
      issue: {
        databaseId: null,
        number: null,
        state: null,
        comments: {
          nodes: [],
        },
      },
      rateLimit: {
        remaining: null,
        cost: 0,
      },
    };

    let hasNextPage = true;
    while (hasNextPage) {
      // eslint-disable-next-line no-await-in-loop
      const resp = await this.graphqlRequest(query, variables);
      // eslint-disable-next-line no-await-in-loop
      const respJson = await resp.json();
      if (respJson.errors) {
        throw new GraphQLError(JSON.stringify(respJson.errors));
      }

      const { rateLimit, repository: issueRepository } = respJson.data;
      const { cost, remaining } = rateLimit;
      const { issue, databaseId: repositoryDatabaseId } = issueRepository;
      const { databaseId: issueDatabaseId, number, state, comments } = issue;
      const { nodes, pageInfo } = comments;

      repository.databaseId = repositoryDatabaseId;

      repository.issue.databaseId = issueDatabaseId;
      repository.issue.number = number;
      repository.issue.state = state;
      nodes.forEach((node) => repository.issue.comments.nodes.push(node));

      hasNextPage = pageInfo.hasNextPage;
      variables.cursor = pageInfo.endCursor;

      repository.rateLimit.remaining = remaining;
      repository.rateLimit.cost += cost;
    }

    return repository;
  }

  /**
   * Retrieves a list of issue or pull request numbers
   * @param {'pr' | 'issue'} type Type to retrieve numbers from
   * @param {string} repoOwner Name of the repository owner
   * @param {string} repoName Name of the repository
   * @param {number} pullRequestsLimit Number of pull requests to retrieve the number of
   * @param {string} startCursor Last synced cursor
   */
  async getIssueOrPullRequestNumbers(
    type,
    repoOwner,
    repoName,
    limit,
    startCursor
  ) {
    const query = `
      query ($repoOwner: String!, $repoName: String!, $first: Int!, $cursor: String, $states: [${
        type === 'pr' ? 'PullRequestState!' : 'IssueState!'
      }]) {
        repository(owner: $repoOwner, name: $repoName) {
          ${
            type === 'pr' ? 'pullRequests' : 'issues'
          }(first: $first, after: $cursor, states: $states) {
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

    const states = ['CLOSED'];
    if (type === 'pr') {
      states.push('MERGED');
    }

    variables.states = states;

    const pullRequestNodes = [];
    const rateLimit = {
      remaining: null,
      cost: 0,
    };

    let numberRetrieved = 0;
    let hasNextPage = true;
    while (hasNextPage && numberRetrieved < limit) {
      const numberRemaining = limit - numberRetrieved;
      const numberToGet = numberRemaining < 100 ? numberRemaining : 100;
      variables.first = numberToGet;

      // eslint-disable-next-line no-await-in-loop
      const resp = await this.graphqlRequest(query, variables);
      // eslint-disable-next-line no-await-in-loop
      const respJson = await resp.json();
      if (respJson.errors) {
        throw new GraphQLError(JSON.stringify(respJson.errors));
      }

      const { rateLimit: currentRateLimit, repository } = respJson.data;
      let pageInfo = null;
      let typeNodes = null;

      if (type === 'pr') {
        const { pullRequests } = repository;
        pageInfo = pullRequests.pageInfo;
        typeNodes = pullRequests.nodes;
      } else {
        const { issues } = repository;
        pageInfo = issues.pageInfo;
        typeNodes = issues;
      }

      rateLimit.remaining = currentRateLimit.remaining;
      rateLimit.cost += currentRateLimit.cost;

      typeNodes.forEach((node) => pullRequestNodes.push(node));

      hasNextPage = pageInfo.hasNextPage;
      variables.cursor = pageInfo.endCursor;

      numberRetrieved += typeNodes.length;
    }

    const response = {
      repository: {
        endCursor: variables.cursor,
      },
      rateLimit,
    };

    if (type === 'pr') {
      response.repository.pullRequests = { nodes: pullRequestNodes };
    } else {
      response.repository.issues = { nodes: pullRequestNodes };
    }

    return response;
  }

  /**
   * Retrieves a list of pull request numbers
   * @param {string} repoOwner Name of the repository owner
   * @param {string} repoName Name of the repository
   * @param {number} pullRequestsLimit Maximum number of pull requests to retrieve the number of
   * @param {string} startCursor Last synced cursor
   */
  getPullRequestNumbers(repoOwner, repoName, pullRequestsLimit, startCursor) {
    return this.getIssueOrPullRequestNumbers(
      'pr',
      repoOwner,
      repoName,
      pullRequestsLimit,
      startCursor
    );
  }

  /**
   * Retrieves a list of issue numbers
   * @param {string} repoOwner Name of the repository owner
   * @param {string} repoName Name of the repository
   * @param {number} issuesLimit Maximum number of issues to retrieve the number of
   * @param {string} startCursor Last synced cursor
   */
  getIssueNumbers(repoOwner, repoName, issuesLimit, startCursor) {
    return this.getIssueOrPullRequestNumbers(
      'issue',
      repoOwner,
      repoName,
      issuesLimit,
      startCursor
    );
  }
}

const instance = new GithubHttpClient();
Object.freeze(instance);

module.exports = instance;
