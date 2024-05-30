const express = require('express');
const userController = require('../controllers/user.controller');
const validateSchema = require('../validations');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/users', authMiddleware, userController.getMe);
router.put(
  '/users',
  authMiddleware,
  validateSchema('updateUser'),
  userController.updateUser
);
router.delete('/users', authMiddleware, userController.deleteUser);
router.patch(
  '/users/change-password',
  authMiddleware,
  validateSchema('changePassword'),
  userController.changePassword
);
router.post('/users/logout', authMiddleware, userController.logout);

module.exports = router;
