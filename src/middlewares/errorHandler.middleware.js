const { ApiError } = require('../utils/ApiErrors');

/**
 * Handles the error by sending an appropriate response to the client.
 * @param {Error} err - The error object.
 * @param {Object} res - The response object.
 */
const handleError = (err, res) => {
  const { statusCode, message, errorMessage } = err;
  res.status(statusCode).json(errorMessage);
};

/**
 * Middleware function that handles errors and sends an appropriate response to the client.
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof ApiError) {
    return handleError(err, res);
  }
  return res.status(500).json({
    status: 'error',
    code: 'SERVER_ERROR',
    message: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;
