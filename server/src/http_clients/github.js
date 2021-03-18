const fetch = require('node-fetch');

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
}

const instance = new GithubHttpClient();
Object.freeze(instance);

module.exports = instance;
