const bcrypt = require('bcryptjs');
const db = require('../models/index');
const {
  NotFoundError,
  BadRequestError,
  ValidationError,
} = require('../utils/ApiErrors');
const { signJWT } = require('../utils/jwt');

// Import the User model from the db module
const User = db.User;

// Get the current user
exports.getMe = async (req, res, next) => {
  try {
    delete req.user.token;
    res.sendSuccessResponse(200, 'User Retrieved Successfully', req.user);
  } catch (error) {
    next(error);
  }
};

// Update the user's information
exports.updateUser = async (req, res, next) => {
  try {
    // Checking if the email is already in use
    if (req.body.email !== req.user.email) {
      const user = await User.findOne({
        where: { email: req.body.email },
      });
      if (user) {
        throw new ValidationError({
          email: { message: 'Email already in use' },
        });
      }
    }
    await User.update(
      { ...req.body, updatedBy: req.user.id },
      { where: { id: req.user.id } }
    );
    res.sendSuccessResponse(200, 'User Updated Successfully', req.body);
  } catch (error) {
    next(error);
  }
};

// Delete a user's account
exports.deleteUser = async (req, res, next) => {
  try {
    await User.destroy({ where: { id: req.user.id } });
    res.sendSuccessResponse(200, 'User Deleted Successfully');
  } catch (error) {
    next(error);
  }
};

// Change the user's password
exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;
    const isMatch = await bcrypt.compare(oldPassword, req.user.password);
    if (!isMatch) {
      throw new BadRequestError('Incorrect old password');
    }
    // save the new password and remove the token
    user.password = newPassword;
    user.token = null;
    await user.save();
    res.sendSuccessResponse(
      200,
      'Your password has been successfully changed. Please log in to continue!'
    );
  } catch (error) {
    next(error);
  }
};

// Logout the user
exports.logout = async (req, res, next) => {
  try {
    // Call the logout method added to the request object in the auth middleware
    req.logout();
    res.sendSuccessResponse(200, 'Logout Successfully');
  } catch (error) {
    next(error);
  }
};
