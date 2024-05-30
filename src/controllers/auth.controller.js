const bcrypt = require('bcryptjs');
const db = require('../models/index');
const { ValidationError, BadRequestError } = require('../utils/ApiErrors');
const { signJWT } = require('../utils/jwt');
const User = db.User;

// Registers a new user
exports.register = async (req, res, next) => {
  try {
    // Check if the user already exists
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      throw new ValidationError({ email: { message: 'Email already in use' } });
    }
    // generate a new token and save it to the user
    const token = signJWT({ email: req.body.email });
    const user = await User.create({ ...req.body, token });
    res.sendSuccessResponse(201, 'User Created Successfully', user);
  } catch (error) {
    next(error);
  }
};

// Logs in a user
exports.login = async (req, res, next) => {
  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      throw new BadRequestError('Invalid Credentials');
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Invalid credentials' });
    }

    // Generate a new token and save it to the user
    const token = signJWT({ email: user.email });

    // Deleting the password from the user object to prevent it from being updated in the database
    delete user.dataValues.password;

    user.token = token;
    await user.save();
    res.sendSuccessResponse(200, 'Logged in Successfully', user);
  } catch (error) {
    next(error);
  }
};
