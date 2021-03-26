const fetch = require('node-fetch');

class BaseHttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.options = {
      headers: new fetch.Headers(),
    };
  }

  /**
   * Performs a request to an API
   * @param {string} route API route to request
   * @param {string} method Method to request with
   * @param {string} body Body of the request
   * @param {Record<string, string>} params Url Search paramers to add
   */
  request(route, method, body, params = {}) {
    const url = new URL(`${this.baseUrl}${route}`);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const options = {
      method,
      ...this.options,
    };

    if (method === 'POST' && body) {
      options.headers.set('Content-Type', 'application/json');
      options.body = body;
    }

    return fetch(url.toString(), options);
  }
}

module.exports = BaseHttpClient;
