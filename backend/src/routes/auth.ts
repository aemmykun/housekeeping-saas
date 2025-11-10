import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  getCurrentUser,
  verifyToken,
  createUserProfile
} from '../controllers/authController';

const router = Router();

/**
 * Authentication Routes
 */

// Verify token
router.post('/verify', authenticateToken, verifyToken);

// Get current authenticated user
router.get('/me', authenticateToken, getCurrentUser);

// Create user profile after registration
router.post('/register', authenticateToken, createUserProfile);

export default router;
