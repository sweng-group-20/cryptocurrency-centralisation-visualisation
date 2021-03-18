const BaseHttpClient = require('./base');

class GithubHttpClient extends BaseHttpClient {
  constructor() {
    super('https://api.github.com');
    this.headers = new Headers();
    this.headers.append('Authorization', `Bearer ${process.env.GITHUB_TOKEN}`);
  }

  /**
   * Performs a graphql request
   * @param {string} body Body of the graphql request
   * @returns {Promise<Request>}
   */
  graphqlRequest(body) {
    return this.request('graphql', 'POST', body, this.headers);
  }
}

const instance = new GithubHttpClient();
Object.freeze(instance);

module.exports = instance;
