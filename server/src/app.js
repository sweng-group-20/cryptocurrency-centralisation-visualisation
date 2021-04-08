const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cron = require('node-cron');
const pLimit = require('p-limit');

const apidocs = require('./routes/api_docs');
const logger = require('./logger');
const routes = require('./routes');
const { notFoundError, errorHandler } = require('./middlewares');
const { refreshSatoshiIndex } = require('./graph_data/satoshi_index');
const { syncDatabase } = require('./graph_data/github_comments');

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
const server = app.listen(port, () => {
  logger.info(`Listening at http://${host}:${port}`);
});

/**
 * Sync repositories every 2 hours
 */
cron.schedule('0 */2 * * *', async () => {
  try {
    const repos = [
      { repoOwner: 'bitcoin', repoName: 'bitcoin' },
      { repoOwner: 'ethereum', repoName: 'go-ethereum' },
    ];
    const limit = pLimit(1);

    await Promise.all(
      repos.map(async ({ repoOwner, repoName }) => {
        limit(async () => {
          logger.info(`Syncing repository github.com/${repoOwner}/${repoName}`);
          await syncDatabase(repoOwner, repoName);
          await refreshSatoshiIndex(repoOwner, repoName);
          logger.info(
            `Sync repository github.com/${repoOwner}/${repoName} complete`
          );
        });
      })
    );
  } catch (err) {
    logger.error({ err }, '[syncDatabase]');
  }
});

module.exports = server;
