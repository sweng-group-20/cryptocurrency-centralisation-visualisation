const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { notFoundError, errorHandler } = require('./middlewares');

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

app.use(notFoundError);
app.use(errorHandler);

const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0';

/**
 * Start web server on port
 */
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://${host}:${port}`);
});
