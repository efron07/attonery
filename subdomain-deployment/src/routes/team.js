const express = require('express');
const teamController = require('../controllers/teamController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const { validateTeamMember, validateId, validatePagination, validateSearch } = require('../middleware/validation');
const router = express.Router();

// Public routes
router.get('/', validatePagination, teamController.getAllTeamMembers);
router.get('/search', validateSearch, teamController.searchTeamMembers);
router.get('/:id', validateId, teamController.getTeamMemberById);

// Protected routes (admin only)
router.get('/admin/all', authenticateToken, authorizeAdmin, validatePagination, teamController.getAllTeamMembersAdmin);
router.post('/', authenticateToken, authorizeAdmin, validateTeamMember, teamController.createTeamMember);
router.put('/:id', authenticateToken, authorizeAdmin, validateId, validateTeamMember, teamController.updateTeamMember);
router.delete('/:id', authenticateToken, authorizeAdmin, validateId, teamController.deleteTeamMember);
router.put('/admin/order', authenticateToken, authorizeAdmin, teamController.updateTeamMemberOrder);
router.get('/admin/stats', authenticateToken, authorizeAdmin, teamController.getTeamMemberStats);

module.exports = router; 