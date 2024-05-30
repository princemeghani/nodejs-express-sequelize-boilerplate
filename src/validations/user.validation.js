const Joi = require('joi');

/**
 * Validation schemas for user operations.
 * @namespace userSchemas
 * @type {Object}
 */
const userSchemas = {
  // Validation schema for updating user information
  updateUser: Joi.object({
    name: Joi.string().required().trim(),
    email: Joi.string().email().required().trim().lowercase(),
  }).options({ abortEarly: false }),

  // Validation schema for changing user password
  changePassword: Joi.object({
    oldPassword: Joi.string().required().trim(),
    newPassword: Joi.string().required().trim(),
  }).options({ abortEarly: false }),
};

module.exports = userSchemas;
