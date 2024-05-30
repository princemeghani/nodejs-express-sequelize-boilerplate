const db = require('../models/index');
const { NotFoundError } = require('../utils/ApiErrors');
const Task = db.Task;

// Check if task exists by ID
const checkTaskExists = async (taskId, userId) => {
  const task = await Task.findOne({ where: { id: taskId, createdBy: userId } });
  if (!task) {
    throw new NotFoundError('Task Not Found');
  }
  return task;
};

// Create a new task
exports.createTask = async (req, res, next) => {
  try {
    const task = (
      await Task.create({ ...req.body, createdBy: req.user.id })
    ).toJSON();
    res.sendSuccessResponse(201, 'Task Created Successfully', task);
  } catch (error) {
    next(error);
  }
};

// Get all tasks by created by user
exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({ where: { createdBy: req.user.id } });
    res.sendSuccessResponse(200, 'Tasks Retrieved Successfully', tasks);
  } catch (error) {
    next(error);
  }
};

// Update an existing task
exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description, completed } = req.body;
    const task = await checkTaskExists(id, req.user.id);
    task.description = description;
    task.completed = completed;
    const updatedTask = await task.save();
    res.sendSuccessResponse(200, 'Task Updated Successfully', updatedTask);
  } catch (error) {
    next(error);
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await checkTaskExists(id, req.user.id);
    res.sendSuccessResponse(200, 'Task Retrieved Successfully', task);
  } catch (error) {
    next(error);
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await checkTaskExists(id, req.user.id);
    await Task.destroy({ where: { id } });
    res.sendSuccessResponse(200, 'Task Deleted Successfully');
  } catch (error) {
    next(error);
  }
};
