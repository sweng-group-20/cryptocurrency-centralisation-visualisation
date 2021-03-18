class BaseHttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Performs a request to an API
   * @param {string} route API route to request
   * @param {string} method Method to request with
   * @param {string} body Body of the request
   * @param {Headers} headers Headers of the request
   * @param {Record<string, string>} params Url Search paramers to add
   * @returns
   */
  request(route, method, body, headers = new Headers(), params = {}) {
    const url = new URL(`${this.baseUrl}${route}`);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    const options = {
      method,
      headers,
    };
    if (method === 'POST' && body) {
      options.headers.append('Content-Type', 'application/json');
      options.body = body;
    }
    return fetch(url.toString(), options);
  }
}

module.exports = BaseHttpClient;
