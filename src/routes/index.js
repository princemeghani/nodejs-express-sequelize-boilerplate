const express = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const taskRoutes = require('./task.routes');
const healthCheck = require('./healthCheck.routes');
const router = express.Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(taskRoutes);
router.use(healthCheck);

module.exports = router;
