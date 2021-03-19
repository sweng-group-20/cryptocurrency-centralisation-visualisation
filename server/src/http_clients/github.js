const fetch = require('node-fetch');
const GraphQLError = require('../errors/GraphQLError');

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
   * @typedef {Object} PostResponseTypeFromPullRequestComments
   * @property {Comments} comments
   * @property {RateLimit} rateLimit
   */

  /**
   * @typedef {Object} Comments
   * @property {Node[]} nodes
   */

  /**
   * @typedef {Object} Node
   * @property {Object} author
   * @property {String} createdAt
   * @property {Number} databaseId
   */

  /**
   * @typedef {Object} RateLimit
   * @property {number} cost
   * @property {number} remaining
   */

  /**
   * Retrieves all the comments of a pull request
   * @param {string} repoOwner Name of the repo owner
   * @param {*} repoName Name of the repo
   * @param {*} pullRequestNumber Pull request number
   * @returns {Promise<PostResponseTypeFromPullRequestComments>}
   */
  async getPullRequestComments(repoOwner, repoName, pullRequestNumber) {
    const commentsQuery = `
    comments(first: 100) {
      nodes {
        databaseId
        bodyText
        ...commentFields
      }
    }
    `;
    const query = `
    query ($repoOwner: String!, $repoName:String!, $pullRequestNumber: Int!) {
      repository(owner: $repoOwner, name: $repoName) {
        pullRequest(number: $pullRequestNumber) {
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
    const { pullRequest } = data.repository;
    const { comments, reviewThreads, reviews } = pullRequest;
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
      comments: {
        nodes: allCommentNodes,
      },
      rateLimit,
    };
  }
}

const instance = new GithubHttpClient();
Object.freeze(instance);

module.exports = instance;
