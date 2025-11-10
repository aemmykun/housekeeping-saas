import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByUser
} from '../controllers/taskController';

const router = Router();

/**
 * Task Routes
 * All routes require authentication
 */

// Get all tasks with optional filters (status, assignedTo, priority)
router.get('/', authenticateToken, getAllTasks);

// Get tasks by user ID
router.get('/user/:userId', authenticateToken, getTasksByUser);

// Get a single task by ID
router.get('/:id', authenticateToken, getTaskById);

// Create a new task
router.post('/', authenticateToken, createTask);

// Update a task
router.put('/:id', authenticateToken, updateTask);

// Delete a task
router.delete('/:id', authenticateToken, deleteTask);

export default router;
