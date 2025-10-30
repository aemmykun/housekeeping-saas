import { Router } from 'express';
import { authenticateToken, requireRole } from '../middleware/auth';
import {
  getCurrentUser,
  createUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById
} from '../controllers/authController';

const router = Router();

/**
 * User Routes
 * Most routes require authentication
 */

// Get all users (admin only)
router.get('/', authenticateToken, requireRole('admin', 'manager'), getAllUsers);

// Get user by ID
router.get('/:id', authenticateToken, getUserById);

// Create user profile
router.post('/', authenticateToken, createUserProfile);

// Update user profile
router.put('/:id', authenticateToken, updateUserProfile);

export default router;
