const express = require('express');
const serviceController = require('../controllers/serviceController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const { validateService, validateId, validatePagination, validateSearch } = require('../middleware/validation');
const router = express.Router();

// Public routes
router.get('/', validatePagination, serviceController.getAllServices);
router.get('/search', validateSearch, serviceController.searchServices);
router.get('/slug/:slug', serviceController.getServiceBySlug);
router.get('/:id', validateId, serviceController.getServiceById);

// Protected routes (admin only)
router.get('/admin/all', authenticateToken, authorizeAdmin, validatePagination, serviceController.getAllServicesAdmin);
router.post('/', authenticateToken, authorizeAdmin, validateService, serviceController.createService);
router.put('/:id', authenticateToken, authorizeAdmin, validateId, validateService, serviceController.updateService);
router.delete('/:id', authenticateToken, authorizeAdmin, validateId, serviceController.deleteService);
router.put('/admin/order', authenticateToken, authorizeAdmin, serviceController.updateServiceOrder);
router.get('/admin/stats', authenticateToken, authorizeAdmin, serviceController.getServiceStats);

module.exports = router; 