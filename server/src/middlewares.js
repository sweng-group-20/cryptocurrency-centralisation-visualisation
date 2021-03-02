const notFoundError = (req, res, next) => {
  res.status(404);
  const error = new Error(`Not found '${req.originalUrl}'`);
  next(error);
};

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
