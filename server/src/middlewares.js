/**
 * 404 not found error
 * @param {Request} req HTTP request
 * @param {Response} res HTTP response
 * @param {CallableFunction} next Callback to the next middleware
 */
const notFoundError = (req, res, next) => {
  res.status(404);
  const error = new Error(`Not found '${req.originalUrl}'`);
  next(error);
};

/**
 * Handle errors by showing error message
 * @param {Error} error Error object
 * @param {Request} req HTTP request
 * @param {Response} res HTTP response
 * @param {CallableFunction} _next Callback to the next middleware
 */
const errorHandler = (error, _req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    error: error.message,
    ...(process.env.NODE_ENV === 'development' && { stacktrace: error.stack }),
  });
};

module.exports = {
  notFoundError,
  errorHandler,
};
