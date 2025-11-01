const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const authController = require('../controllers/auth.controller');

// Public routes
router.post('/verify', authController.verifyToken);

// Protected routes
router.get('/user', authenticate, authController.getUserInfo);

module.exports = router;
