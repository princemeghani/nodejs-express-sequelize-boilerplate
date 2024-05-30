/**
 * Middleware function that adds a custom method to the response object to send success responses.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const successResponseMiddleware = (req, res, next) => {
  /**
   * Sends a success response with the provided status code, message, and data.
   * @param {number} [statusCode=200] - The status code of the response.
   * @param {string} [message='Success'] - The message of the response.
   * @param {any} [data] - The data to be included in the response.
   */
  res.sendSuccessResponse = (statusCode = 200, message = 'Success', data) => {
    res.status(statusCode).json({
      status: 'success',
      message,
      data: data ? data : undefined,
    });
  };
  next();
};

module.exports = successResponseMiddleware;
