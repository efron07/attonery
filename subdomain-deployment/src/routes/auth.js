const express = require('express');
const authController = require('../controllers/authController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const { validateLogin, validateUser } = require('../middleware/validation');
const router = express.Router();

// Public routes
router.post('/login', validateLogin, authController.login);
router.post('/verify', authController.verify);
router.post('/refresh', authController.refresh);

// Protected routes
router.post('/logout', authenticateToken, authController.logout);
router.get('/profile', authenticateToken, authController.getProfile);
router.put('/change-password', authenticateToken, authController.changePassword);

// Admin routes
router.post('/create-admin', validateUser, authorizeAdmin, authController.createAdmin);
router.get('/stats', authenticateToken, authorizeAdmin, authController.getAuthStats);

module.exports = router; 