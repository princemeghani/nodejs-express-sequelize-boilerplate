const db = require('../models');
const { UnauthorizedError } = require('../utils/ApiErrors');
const { verifyJWT } = require('../utils/jwt');
const User = db.User;

/**
 * Middleware for authenticating requests using JWT token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {UnauthorizedError} If the token is missing, invalid, or the user is not found.
 */

const authMiddleware = async (req, res, next) => {
  try {
    // Getting the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedError();
    }

    // Verifying the token
    const verified = verifyJWT(token);
    if (!verified) {
      throw new UnauthorizedError();
    }

    // Finding the user by the token
    const user = await User.findOne({ where: { token } });
    if (!user) {
      throw new UnauthorizedError();
    }

    // Adding the user object to the request object
    req.user = user.toJSON();

    // Adding a logout method to the request object
    req.logout = () => {
      // Removing the password from the user object to prevent it from being updated in the database
      delete user.dataValues.password;
      user.token = null;
      user.save();
    };

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = authMiddleware;
