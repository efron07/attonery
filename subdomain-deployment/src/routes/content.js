const express = require('express');
const contentController = require('../controllers/contentController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const { validateContent, validateContactSettings } = require('../middleware/validation');
const router = express.Router();

// Public routes
router.get('/about', contentController.getAboutContent);
router.get('/contact', contentController.getContactSettings);

// Protected routes (admin only)
router.get('/admin/all', authenticateToken, authorizeAdmin, contentController.getAllContent);
router.put('/about', authenticateToken, authorizeAdmin, validateContent, contentController.updateAboutContent);
router.put('/contact', authenticateToken, authorizeAdmin, validateContactSettings, contentController.updateContactSettings);
router.get('/admin/stats', authenticateToken, authorizeAdmin, contentController.getContentStats);

module.exports = router; 