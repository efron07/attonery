const express = require('express');
const uploadController = require('../controllers/uploadController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const { validateFileUpload, validateId, validatePagination } = require('../middleware/validation');
const { uploadSingle, uploadMultiple, uploadByType, handleUploadError, validateFile, cleanupFiles } = require('../middleware/upload');
const router = express.Router();

// Public routes (if needed)
// router.post('/single', uploadSingle('file'), validateFile, cleanupFiles, uploadController.uploadSingle);

// Protected routes (admin only)
router.post('/single', authenticateToken, authorizeAdmin, uploadSingle('file'), validateFile, cleanupFiles, uploadController.uploadSingle);
router.post('/multiple', authenticateToken, authorizeAdmin, uploadMultiple('files', 10), validateFile, cleanupFiles, uploadController.uploadMultiple);
router.post('/image', authenticateToken, authorizeAdmin, uploadByType('image'), validateFile, cleanupFiles, uploadController.uploadImage);
router.post('/document', authenticateToken, authorizeAdmin, uploadByType('document'), validateFile, cleanupFiles, uploadController.uploadDocument);

// File management routes
router.get('/files', authenticateToken, authorizeAdmin, validatePagination, uploadController.listFiles);
router.get('/files/:filename', authenticateToken, authorizeAdmin, uploadController.getFileInfo);
router.delete('/files/:filename', authenticateToken, authorizeAdmin, uploadController.deleteFile);
router.get('/stats', authenticateToken, authorizeAdmin, uploadController.getUploadStats);

// Error handling middleware
router.use(handleUploadError);

module.exports = router; 