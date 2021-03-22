const pino = require('pino');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
Object.freeze(logger);

module.exports = logger;
