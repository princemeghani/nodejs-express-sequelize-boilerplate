const Joi = require('joi');

const { ValidationError } = require('../utils/ApiErrors');
const { formatJoiErrorMessage } = require('../utils/validationErrorFormatter');

const userSchemas = require('./user.validation');
const authSchemas = require('./auth.validation');
const taskSchemas = require('./task.validation');

// Combine all schemas into one object
const allSchemas = { ...userSchemas, ...authSchemas, ...taskSchemas };

/**
 * Middleware function to validate the request body against a specific schema.
 * @param {string} schemaType - The type of schema to validate against.
 * @returns {Function} - The middleware function.
 */
const validateSchema = (schemaType) => {
  return (req, res, next) => {
    try {
      let schema = allSchemas[schemaType];
      const { error, value } = schema.validate(req.body);
      if (error) {
        const readableErrors = formatJoiErrorMessage(error);
        throw new ValidationError(readableErrors);
      }
      req.body = value;
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = validateSchema;
