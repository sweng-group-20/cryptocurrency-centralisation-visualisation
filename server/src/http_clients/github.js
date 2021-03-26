const GitHubError = require('../errors/GitHubError');
const GraphQLError = require('../errors/GraphQLError');

const BaseHttpClient = require('./base');

class GitHubHttpClient extends BaseHttpClient {
  constructor() {
    super('https://api.github.com');
    this.options.headers.set(
      'Authorization',
      `Bearer ${process.env.GITHUB_TOKEN}`
    );
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

    return this.request('/graphql', 'POST', body);
  }

  /**
   * Pagenates pull request nodes
   * @param {'comments' | 'reviews' | 'reviewThreads'} type Type to pagenate
   * @param {string} repoOwner Name of the repository owner
   * @param {string} repoName Name of the repository
   * @param {number} pullRequestNumber Pull request number
   * @param {string} nodeFields Fields that a node should include
   * @param {Object} pageInfo Page info object used for pagenation
   * @returns
   */
  async pagenatePullRequestNodes(
    type,
    repoOwner,
    repoName,
    pullRequestNumber,
    nodeFields,
    pageInfo
  ) {
    const query = `
      query ($repoOwner: String!, $repoName: String!, $pullRequestNumber: Int!, $cursor: String) {
        repository(owner: $repoOwner, name: $repoName) {
          pullRequest(number: $pullRequestNumber) {
            ${type}(first: 100, after: $cursor) {
              nodes {
                ${nodeFields}
              }
              pageInfo {
                ...pageInfoFields
              }
            }
          }
        }
      }

      fragment commentFields on Comment {
        createdAt
        body
        author {
          login
        }
      }

      fragment pageInfoFields on PageInfo {
        endCursor
        hasNextPage
      }
    `;

    const variables = {
      repoOwner,
      repoName,
      pullRequestNumber,
      cursor: pageInfo.endCursor,
    };

    const result = {
      nodes: [],
    };

    let { hasNextPage } = pageInfo;
    while (hasNextPage) {
      // eslint-disable-next-line no-await-in-loop
      const resp = await this.graphqlRequest(query, variables);
      // eslint-disable-next-line no-await-in-loop
      const respJson = await resp.json();
      if (!resp.ok) {
        throw new GitHubError(JSON.stringify(respJson));
      }
      if (respJson.errors) {
        throw new GraphQLError(JSON.stringify(respJson.errors));
      }

      const {
        nodes,
        pageInfo: currentPageInfo,
      } = respJson.data.repository.pullRequest[type];
      nodes.forEach((node) => result.nodes.push(node));

      variables.cursor = currentPageInfo.endCursor;
      hasNextPage = currentPageInfo.hasNextPage;
    }

    return { [type]: result };
  }

  /**
   * Retrieves all the comments of a pull request
   * @param {string} repoOwner Name of the repository owner
   * @param {string} repoName Name of the repository
   * @param {number} pullRequestNumber Pull request number
   */
  async getPullRequestComments(repoOwner, repoName, pullRequestNumber) {
    const query = `
      query ($repoOwner: String!, $repoName: String!, $pullRequestNumber: Int!) {
        repository(owner: $repoOwner, name: $repoName) {
          databaseId
          pullRequest(number: $pullRequestNumber) {
            databaseId
            number
            state
            comments(first: 100) {
              nodes {
                databaseId
                ...commentFields
              }
              pageInfo {
                ...pageInfoFields
              }
            }
            reviews(first: 100) {
              nodes {
                databaseId
                ...commentFields
              }
              pageInfo {
                ...pageInfoFields
              }
            }
            reviewThreads(first:100) {
              nodes {
                comments(first: 100) {
                  nodes {
                    databaseId
                    ...commentFields
                  }
                }
              }
              pageInfo {
                ...pageInfoFields
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
        body
        author {
          login
        }
      }

      fragment pageInfoFields on PageInfo {
        endCursor
        hasNextPage
      }
    `;
    const variables = {
      repoOwner,
      repoName,
      pullRequestNumber,
    };

    const resp = await this.graphqlRequest(query, variables);
    const respJson = await resp.json();
    if (!resp.ok) {
      throw new GitHubError(JSON.stringify(respJson));
    }
    if (respJson.errors) {
      throw new GraphQLError(JSON.stringify(respJson.errors));
    }

    const { repository, rateLimit } = respJson.data;
    const { pullRequest, databaseId: repoDatabaseId } = repository;
    const {
      comments,
      reviewThreads,
      reviews,
      number,
      state,
      databaseId: pullRequestDatabaseId,
    } = pullRequest;

    const allCommentNodes = [...comments.nodes];
    const reviewAndCommentNodeFields = `
      databaseId
      ...commentFields
    `;
    const addNodes = (node) => allCommentNodes.push(node);
    (
      await this.pagenatePullRequestNodes(
        'comments',
        repoOwner,
        repoName,
        pullRequestNumber,
        reviewAndCommentNodeFields,
        comments.pageInfo
      )
    ).comments.nodes.forEach(addNodes);

    reviews.nodes.forEach(addNodes);
    (
      await this.pagenatePullRequestNodes(
        'reviews',
        repoOwner,
        repoName,
        pullRequestNumber,
        reviewAndCommentNodeFields,
        reviews.pageInfo
      )
    ).reviews.nodes.forEach(addNodes);

    const extractReviewThreadNodes = ({ comments: reviewComments }) => {
      reviewComments.nodes.forEach((comment) => {
        allCommentNodes.push(comment);
      });
    };
    const reviewThreadNodeFields = `
      comments(first: 100) {
        nodes {
          ${reviewAndCommentNodeFields}
        }
      }
    `;
    reviewThreads.nodes.forEach(extractReviewThreadNodes);
    (
      await this.pagenatePullRequestNodes(
        'reviewThreads',
        repoOwner,
        repoName,
        pullRequestNumber,
        reviewThreadNodeFields,
        reviewThreads.pageInfo
      )
    ).reviewThreads.nodes.forEach(extractReviewThreadNodes);

    const filteredCommentNodes = allCommentNodes
      .filter(({ body }) => body.length > 0)
      .map(({ databaseId, createdAt, author }) => ({
        databaseId,
        createdAt,
        author,
      }));

    return {
      repository: {
        databaseId: repoDatabaseId,
        pullRequest: {
          number,
          state,
          databaseId: pullRequestDatabaseId,
          comments: {
            nodes: filteredCommentNodes,
          },
        },
      },
      rateLimit,
    };
  }

  /**
   * Retrieves all the comments of an issue
   * @param {string} repoOwner Name of the repository owner
   * @param {string} repoName Name of the repository
   * @param {number} issueNumber Issue number
   */
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
      if (!resp.ok) {
        throw new GitHubError(JSON.stringify(respJson));
      }
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

    return { repository };
  }

  /**
   * Retrieves a list of issue or pull request numbers
   * @param {'pullRequests' | 'issues'} type Type to retrieve numbers from
   * @param {string} repoOwner Name of the repository owner
   * @param {string} repoName Name of the repository
   * @param {number} limit Number of issues or pull requests to retrieve the number of
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
        type === 'pullRequests' ? 'PullRequestState!' : 'IssueState!'
      }]) {
        repository(owner: $repoOwner, name: $repoName) {
          ${type}(first: $first, after: $cursor, states: $states) {
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
    if (type === 'pullRequests') {
      states.push('MERGED');
    }

    variables.states = states;

    const nodes = [];
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
      if (!resp.ok) {
        throw new GitHubError(JSON.stringify(respJson));
      }
      if (respJson.errors) {
        throw new GraphQLError(JSON.stringify(respJson.errors));
      }

      const { rateLimit: currentRateLimit, repository } = respJson.data;
      let pageInfo = null;
      let issueOrPullRequestNodes = null;

      pageInfo = repository[type].pageInfo;
      issueOrPullRequestNodes = repository[type].nodes;

      rateLimit.remaining = currentRateLimit.remaining;
      rateLimit.cost += currentRateLimit.cost;

      issueOrPullRequestNodes.forEach((node) => nodes.push(node));

      hasNextPage = pageInfo.hasNextPage;
      variables.cursor = pageInfo.endCursor;

      numberRetrieved += issueOrPullRequestNodes.length;
    }

    const response = {
      repository: {
        [type]: { nodes },
        endCursor: variables.cursor,
      },
      rateLimit,
    };

    return response;
  }

  /**
   * Returns the rate limit
   */
  async getRateLimit() {
    const query = `
      query {
        rateLimit {
          remaining
          resetAt
        }
      }
    `;

    const resp = await this.graphqlRequest(query);
    const respJson = await resp.json();
    if (!resp.ok) {
      throw new GitHubError(JSON.stringify(respJson));
    }
    if (respJson.errors) {
      throw new GraphQLError(JSON.stringify(respJson.errors));
    }

    return respJson.data;
  }
}

const instance = new GitHubHttpClient();
Object.freeze(instance);

module.exports = instance;
