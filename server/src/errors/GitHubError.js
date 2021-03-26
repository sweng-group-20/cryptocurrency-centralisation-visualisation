class GitHubError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GitHubError';
    this.stack = new Error().stack;
  }
}

module.exports = GitHubError;
