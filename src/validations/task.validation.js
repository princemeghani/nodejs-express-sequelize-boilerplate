const Joi = require('joi');

/**
 * Validation schemas for add and update task.
 * @namespace taskSchemas
 * @property {Joi.ObjectSchema} addTask - Validation schema for add task.
 * @property {Joi.ObjectSchema} updateTask - Validation schema for update task.
 */

const taskSchemas = {
  // Validation schema for adding a task
  addTask: Joi.object({
    description: Joi.string().required().trim(),
  }).options({ abortEarly: false }),

  // Validation schema for updating a task
  updateTask: Joi.object({
    description: Joi.string().required().trim(),
    completed: Joi.boolean().required(),
  }).options({ abortEarly: false }),
};

module.exports = taskSchemas;
