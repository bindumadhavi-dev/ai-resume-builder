// Error Handling Middleware

const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);

  let error = {
    message: err.message || 'Server Error',
    status: err.status || 500,
  };

  if (err.name === 'ValidationError') {
    error.message = Object.values(err.errors)
      .map(val => val.message)
      .join(', ');
    error.status = 400;
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error.message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    error.status = 400;
  }

  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token';
    error.status = 401;
  }

  if (err.name === 'CastError') {
    error.message = 'Invalid ID format';
    error.status = 400;
  }

  res.status(error.status).json({
    success: false,
    message: error.message,
  });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
