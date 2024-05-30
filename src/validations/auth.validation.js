const Joi = require('joi');

/**
 * Validation schemas for user registration and login.
 * @namespace authSchemas
 * @property {Joi.ObjectSchema} register - Validation schema for user registration.
 * @property {Joi.ObjectSchema} login - Validation schema for user login.
 */
const authSchemas = {
  // Validation schema for user registration.
  register: Joi.object({
    name: Joi.string().required().trim(),
    email: Joi.string().email().required().trim().lowercase(),
    password: Joi.string().required().trim(),
  }).options({ abortEarly: false }),

  // Validation schema for user login.
  login: Joi.object({
    email: Joi.string().email().required().trim().lowercase(),
    password: Joi.string().required().trim(),
  }).options({ abortEarly: false }),
};

module.exports = authSchemas;
