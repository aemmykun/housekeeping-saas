const firebaseService = require('../services/firebase.service');

// Get all tasks
async function getTasks(req, res, next) {
  try {
    const tasks = await firebaseService.getCollection('tasks');
    res.json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
}

// Get single task
async function getTask(req, res, next) {
  try {
    const { id } = req.params;
    const task = await firebaseService.getDocument('tasks', id);
    
    if (!task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }
    
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
}

// Create task
async function createTask(req, res, next) {
  try {
    const taskData = {
      ...req.body,
      createdBy: req.user.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const task = await firebaseService.createDocument('tasks', taskData);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
}

// Update task
async function updateTask(req, res, next) {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    const task = await firebaseService.updateDocument('tasks', id, updateData);
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
}

// Update task status
async function updateTaskStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ 
        success: false, 
        message: 'Status is required' 
      });
    }

    const updateData = {
      status,
      updatedAt: new Date().toISOString()
    };

    const task = await firebaseService.updateDocument('tasks', id, updateData);
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
}

// Delete task
async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;
    await firebaseService.deleteDocument('tasks', id);
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask
};
