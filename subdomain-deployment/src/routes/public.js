const express = require('express');
const publicController = require('../controllers/publicController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const { validateInquiry, validateSubscriber, validateId, validatePagination } = require('../middleware/validation');
const router = express.Router();

// Public routes
router.post('/inquiries', validateInquiry, publicController.submitInquiry);
router.post('/subscribers', validateSubscriber, publicController.subscribeToNewsletter);
router.post('/unsubscribe', validateSubscriber, publicController.unsubscribeFromNewsletter);

// Protected routes (admin only)
router.get('/inquiries', authenticateToken, authorizeAdmin, validatePagination, publicController.getInquiries);
router.get('/subscribers', authenticateToken, authorizeAdmin, validatePagination, publicController.getSubscribers);
router.put('/inquiries/:id', authenticateToken, authorizeAdmin, validateId, publicController.updateInquiryStatus);
router.get('/inquiries/stats', authenticateToken, authorizeAdmin, publicController.getInquiryStats);
router.get('/subscribers/stats', authenticateToken, authorizeAdmin, publicController.getSubscriberStats);

module.exports = router; 