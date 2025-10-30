const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const taskController = require('../controllers/task.controller');

// All routes require authentication
router.use(authenticate);

// Task routes
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTask);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.patch('/:id/status', taskController.updateTaskStatus);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
