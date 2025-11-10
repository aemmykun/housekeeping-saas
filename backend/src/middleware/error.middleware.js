// Error handling middleware
function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  // Default error
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Firebase specific errors
  if (err.code) {
    switch (err.code) {
      case 'auth/id-token-expired':
        statusCode = 401;
        message = 'Token expired';
        break;
      case 'auth/invalid-id-token':
        statusCode = 401;
        message = 'Invalid token';
        break;
      case 'auth/user-not-found':
        statusCode = 404;
        message = 'User not found';
        break;
      default:
        message = err.message;
    }
  }

  res.status(statusCode).json({
    error: err.name || 'Error',
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

// 404 handler
function notFoundHandler(req, res) {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
}

module.exports = { errorHandler, notFoundHandler };
