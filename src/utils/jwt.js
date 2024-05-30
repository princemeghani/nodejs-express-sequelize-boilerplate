const jwt = require('jsonwebtoken');

/**
 * Signs a JSON Web Token (JWT) with the provided data.
 * @param {any} data - The data to be included in the JWT payload.
 * @returns {string} - The signed JWT.
 */
exports.signJWT = (data) => {
  return jwt.sign(
    {
      data,
    },
    process.env.SERVER_JWT_SECRET,
    { expiresIn: process.env.SERVER_JWT_TIMEOUT }
  );
};

/**
 * Verifies the authenticity of a JSON Web Token (JWT).
 * @param {string} token - The JWT to be verified.
 * @returns {object | null} - The decoded payload of the JWT if it is valid, or null if it is not valid.
 */
exports.verifyJWT = (token) => {
  try {
    return jwt.verify(token, process.env.SERVER_JWT_SECRET);
  } catch (e) {
    return null;
  }
};
