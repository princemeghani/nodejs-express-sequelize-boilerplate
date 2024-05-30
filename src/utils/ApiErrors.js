/**
 * Represents an API error.
 * @class
 * @extends Error
 */
class ApiError extends Error {
  /**
   * Creates an instance of ApiError.
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code.
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.errorMessage = { status: 'error', ...message };
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Represents a "Not Found" error.
 * @class
 * @extends ApiError
 */
class NotFoundError extends ApiError {
  /**
   * Creates an instance of NotFoundError.
   * @param {string} [message='Resource not found'] - The error message.
   */
  constructor(message = 'Resource not found') {
    super({ code: 'NOT_FOUND', errors: { message } }, 404);
  }
}

/**
 * Represents a "Bad Request" error.
 * @class
 * @extends ApiError
 */
class BadRequestError extends ApiError {
  /**
   * Creates an instance of BadRequestError.
   * @param {string} [message='Bad request'] - The error message.
   */
  constructor(message = 'Bad request') {
    super({ code: 'BAD_REQUEST', errors: { message } }, 400);
  }
}

/**
 * Represents an "Unauthorized" error.
 * @class
 * @extends ApiError
 */
class UnauthorizedError extends ApiError {
  /**
   * Creates an instance of UnauthorizedError.
   * @param {string} [message='Unauthorized'] - The error message.
   */
  constructor(message = 'Unauthorized') {
    super({ code: 'UNAUTHORIZED', errors: { message } }, 401);
  }
}

/**
 * Represents a "Forbidden" error.
 * @class
 * @extends ApiError
 */
class ForbiddenError extends ApiError {
  /**
   * Creates an instance of ForbiddenError.
   * @param {string} [message='Forbidden'] - The error message.
   */
  constructor(message = 'Forbidden') {
    super({ code: 'FORBIDDEN', errors: { message } }, 403);
  }
}

/**
 * Represents a "Validation" error.
 * @class
 * @extends ApiError
 */
class ValidationError extends ApiError {
  /**
   * Creates an instance of ValidationError.
   * @param {Object} [fields={}] - The validation error fields.
   */
  constructor(fields = {}) {
    super(
      {
        code: 'VALIDATION',
        errors: { message: 'Validation Error', fields },
      },
      400
    );
  }
}

module.exports = {
  ApiError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  ValidationError,
};
