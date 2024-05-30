const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const taskController = require('../controllers/task.controller');
const validateSchema = require('../validations');

const router = express.Router();

router.post(
  '/tasks',
  authMiddleware,
  validateSchema('addTask'),
  taskController.createTask
);
router.get('/tasks', authMiddleware, taskController.getAllTasks);
router.get('/tasks/:id', authMiddleware, taskController.getTaskById);
router.put(
  '/tasks/:id',
  authMiddleware,
  validateSchema('updateTask'),
  taskController.updateTask
);
router.delete('/tasks/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
