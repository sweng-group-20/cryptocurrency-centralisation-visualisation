const pino = require('pino');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  serializers: { err: pino.stdSerializers.err },
});
Object.freeze(logger);

module.exports = logger;
