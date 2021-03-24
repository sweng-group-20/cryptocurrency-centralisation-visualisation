const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cron = require('node-cron');

const routes = require('./routes');
const apidocs = require('./routes/api_docs');
const { notFoundError, errorHandler } = require('./middlewares');
const { syncDatabase } = require('./graph_data/github_comments');
const logger = require('./logger');

const app = express();

/**
 * Add middlewares
 */
app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN_URL || 'http://localhost:3000',
  })
);
app.use(express.json());

/**
 * @swagger
 * /:
 *  get:
 *      description: Hello World Response
 *      responses:
 *          200:
 *              description: Successful response
 */
app.get('/', (_req, res) => {
  res.status(200);
  res.json({
    message: 'hello world',
  });
});

/**
 * Add routes
 */
app.use('/api-docs', apidocs);
app.use('/api/v1', routes);

app.use(notFoundError);
app.use(errorHandler);

const port = process.env.PORT || 4000;
const host = process.env.HOST || 'localhost';

/**
 * Start web server on port
 */
app.listen(port, () => {
  logger.info(`Listening at http://${host}:${port}`);
});

/**
 * Sync repositories every 2 hours
 */
cron.schedule('0 */2 * * *', async () => {
  try {
    const repoOwner = 'bitcoin';
    const repoName = 'bitcoin';

    logger.info(`Syncing repository github.com/${repoOwner}/${repoName}`);
    await syncDatabase(repoOwner, repoName);
    logger.info(`Sync repository github.com/${repoOwner}/${repoName} complete`);
  } catch (err) {
    logger.error({ err }, '[syncDatabase]');
  }
});
