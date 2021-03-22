const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cron = require('node-cron');

const routes = require('./routes/index');
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
 * Hello world response
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
cron.schedule('0 */2 * * *', () => {
  const repoOwner = 'bitcoin';
  const repoName = 'bitcoin';

  logger.info(`Syncing repository github.com/${repoOwner}/${repoName}`);
  syncDatabase(repoOwner, repoName);
});
