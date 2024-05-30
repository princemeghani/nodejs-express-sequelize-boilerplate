const express = require('express');
const userController = require('../controllers/auth.controller');
const validateSchema = require('../validations');
const router = express.Router();

router.post('/register', validateSchema('register'), userController.register);
router.post('/login', validateSchema('login'), userController.login);

module.exports = router;
