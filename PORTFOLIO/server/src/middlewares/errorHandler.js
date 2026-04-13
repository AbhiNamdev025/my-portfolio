const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  if (process.env.NODE_ENV !== 'test') {
    console.error('Error:', error);
    if (error.cause) {
      console.error('Error Cause:', error.cause);
    }
  }

  res.status(statusCode).json({
    success: false,
    message: error.message || 'Something went wrong on the server.'
  });
};

module.exports = errorHandler;
