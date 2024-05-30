/**
 * Formats the error messages from Joi validation library.
 *
 * @param {Object} errors - The errors object from Joi validation.
 * @returns {Object} - The formatted error messages.
 */
const formatJoiErrorMessage = (errors) => {
  const formattedErrors = {};

  errors?.details?.map((e) => {
    if (e?.context?.key) {
      formattedErrors[e.context.key] = {
        message: e?.message,
      };
    }
  });
  return formattedErrors;
};

module.exports = { formatJoiErrorMessage };
