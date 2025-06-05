const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle custom errors
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.message,
      name: err.name
    });
  }

  // Handle validation errors from express-validator
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: err.message,
      name: 'ValidationError'
    });
  }

  // Handle other errors
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

module.exports = errorHandler; 