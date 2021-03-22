class GraphQLError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GraphQLError';
    this.stack = new Error().stack;
  }
}

module.exports = GraphQLError;
