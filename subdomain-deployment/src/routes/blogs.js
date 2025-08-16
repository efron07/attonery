const express = require('express');
const blogController = require('../controllers/blogController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const { validateBlog, validateId, validatePagination, validateSearch } = require('../middleware/validation');
const router = express.Router();

// Public routes
router.get('/', validatePagination, blogController.getAllBlogs);
router.get('/featured', blogController.getFeaturedBlogs);
router.get('/recent', blogController.getRecentBlogs);
router.get('/categories', blogController.getBlogCategories);
router.get('/search', validateSearch, blogController.searchBlogs);
router.get('/:id', validateId, blogController.getBlogById);

// Protected routes (admin only)
router.get('/admin/all', authenticateToken, authorizeAdmin, validatePagination, blogController.getAllBlogsAdmin);
router.post('/', authenticateToken, authorizeAdmin, validateBlog, blogController.createBlog);
router.put('/:id', authenticateToken, authorizeAdmin, validateId, validateBlog, blogController.updateBlog);
router.delete('/:id', authenticateToken, authorizeAdmin, validateId, blogController.deleteBlog);
router.get('/admin/stats', authenticateToken, authorizeAdmin, blogController.getBlogStats);

module.exports = router; 