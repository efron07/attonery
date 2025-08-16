const { body, validationResult, param, query } = require('express-validator');
const logger = require('../utils/logger');

// Enhanced validation error handler
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(error => ({
            field: error.path,
            message: error.msg,
            value: error.value,
            location: error.location
        }));

        logger.warn('Validation failed', {
            path: req.path,
            method: req.method,
            errors: formattedErrors
        });

        return res.status(400).json({
            error: 'Validation failed',
            code: 'VALIDATION_ERROR',
            details: formattedErrors,
            timestamp: new Date().toISOString()
        });
    }
    next();
};

// Sanitize and validate common fields
const sanitizeString = (field, minLength = 1, maxLength = 255) =>
    body(field)
        .trim()
        .isLength({ min: minLength, max: maxLength })
        .withMessage(`${field} must be ${minLength}-${maxLength} characters`)
        .escape();

const sanitizeOptionalString = (field, maxLength = 255) =>
    body(field)
        .optional()
        .trim()
        .isLength({ max: maxLength })
        .withMessage(`${field} must be maximum ${maxLength} characters`)
        .escape();

const sanitizeEmail = (field) =>
    body(field)
        .optional()
        .isEmail()
        .withMessage('Must be a valid email address')
        .normalizeEmail();

// Blog validation
const validateBlog = [
    sanitizeString('title', 1, 200),
    body('content')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Content is required')
        .isLength({ max: 50000 })
        .withMessage('Content must be maximum 50,000 characters'),
    sanitizeString('author', 1, 100),
    sanitizeOptionalString('excerpt', 500),
    sanitizeOptionalString('category', 100),
    sanitizeOptionalString('meta_description', 500),
    sanitizeOptionalString('keywords', 500),
    body('published')
        .optional()
        .isBoolean()
        .withMessage('Published must be a boolean value'),
    body('featured')
        .optional()
        .isBoolean()
        .withMessage('Featured must be a boolean value'),
    body('slug')
        .optional()
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage('Slug must be 1-255 characters')
        .matches(/^[a-z0-9-]+$/)
        .withMessage('Slug must contain only lowercase letters, numbers, and hyphens'),
    handleValidationErrors
];

// Service validation
const validateService = [
    sanitizeString('title', 1, 200),
    body('description')
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Description must be 1-1000 characters'),
    sanitizeOptionalString('icon', 10),
    sanitizeOptionalString('link', 200),
    sanitizeOptionalString('gradient', 100),
    body('order_index')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Order index must be a non-negative integer'),
    body('active')
        .optional()
        .isBoolean()
        .withMessage('Active must be a boolean value'),
    body('overview')
        .optional()
        .trim()
        .isLength({ max: 10000 })
        .withMessage('Overview must be maximum 10,000 characters'),
    sanitizeOptionalString('features', 2000),
    sanitizeOptionalString('process_steps', 2000),
    sanitizeOptionalString('requirements', 2000),
    sanitizeOptionalString('benefits', 2000),
    sanitizeOptionalString('meta_description', 500),
    sanitizeOptionalString('keywords', 500),
    body('slug')
        .optional()
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage('Slug must be 1-255 characters')
        .matches(/^[a-z0-9-]+$/)
        .withMessage('Slug must contain only lowercase letters, numbers, and hyphens'),
    handleValidationErrors
];

// Team member validation
const validateTeamMember = [
    sanitizeString('name', 1, 100),
    sanitizeString('title', 1, 200),
    body('bio')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Bio must be maximum 1,000 characters'),
    sanitizeOptionalString('image', 500),
    sanitizeOptionalString('specialties', 500),
    sanitizeOptionalString('experience', 50),
    body('order_index')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Order index must be a non-negative integer'),
    body('active')
        .optional()
        .isBoolean()
        .withMessage('Active must be a boolean value'),
    sanitizeEmail('email'),
    sanitizeOptionalString('linkedin', 255),
    handleValidationErrors
];

// Inquiry validation
const validateInquiry = [
    sanitizeString('name', 1, 100),
    body('phone')
        .trim()
        .isLength({ min: 1, max: 20 })
        .withMessage('Phone must be 1-20 characters')
        .matches(/^[\+]?[0-9\s\-\(\)]+$/)
        .withMessage('Phone must contain only numbers, spaces, hyphens, and parentheses'),
    sanitizeEmail('email'),
    sanitizeString('service', 1, 100),
    body('message')
        .trim()
        .isLength({ min: 1, max: 2000 })
        .withMessage('Message must be 1-2000 characters'),
    handleValidationErrors
];

// Subscriber validation
const validateSubscriber = [
    body('email')
        .isEmail()
        .withMessage('Must be a valid email address')
        .normalizeEmail(),
    handleValidationErrors
];

// User validation
const validateUser = [
    sanitizeString('username', 3, 100),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
    body('role')
        .optional()
        .isIn(['admin', 'editor', 'viewer'])
        .withMessage('Role must be admin, editor, or viewer'),
    handleValidationErrors
];

// Login validation
const validateLogin = [
    sanitizeString('username', 1, 100),
    body('password')
        .isLength({ min: 1 })
        .withMessage('Password is required'),
    handleValidationErrors
];

// ID parameter validation
const validateId = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('ID must be a positive integer'),
    handleValidationErrors
];

// Pagination validation
const validatePagination = [
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),
    query('offset')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Offset must be a non-negative integer'),
    handleValidationErrors
];

// Search validation
const validateSearch = [
    query('q')
        .optional()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Search query must be 1-100 characters'),
    query('category')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Category must be maximum 100 characters'),
    handleValidationErrors
];

// File upload validation
const validateFileUpload = [
    body('type')
        .optional()
        .isIn(['image', 'document'])
        .withMessage('File type must be image or document'),
    body('maxSize')
        .optional()
        .isInt({ min: 1, max: 10485760 }) // 10MB max
        .withMessage('Max file size must be between 1 and 10MB'),
    handleValidationErrors
];

// Content validation
const validateContent = [
    body('intro')
        .optional()
        .trim()
        .isLength({ max: 2000 })
        .withMessage('Intro must be maximum 2,000 characters'),
    body('who_we_are')
        .optional()
        .trim()
        .isLength({ max: 5000 })
        .withMessage('Who we are must be maximum 5,000 characters'),
    body('vision')
        .optional()
        .trim()
        .isLength({ max: 2000 })
        .withMessage('Vision must be maximum 2,000 characters'),
    body('mission')
        .optional()
        .trim()
        .isLength({ max: 2000 })
        .withMessage('Mission must be maximum 2,000 characters'),
    body('company_values')
        .optional()
        .trim()
        .isLength({ max: 3000 })
        .withMessage('Company values must be maximum 3,000 characters'),
    body('impact_stats')
        .optional()
        .trim()
        .isLength({ max: 2000 })
        .withMessage('Impact stats must be maximum 2,000 characters'),
    handleValidationErrors
];

// Contact settings validation
const validateContactSettings = [
    sanitizeEmail('email'),
    body('phone')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Phone must be maximum 50 characters')
        .matches(/^[\+]?[0-9\s\-\(\)]+$/)
        .withMessage('Phone must contain only numbers, spaces, hyphens, and parentheses'),
    body('whatsapp')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('WhatsApp must be maximum 50 characters')
        .matches(/^[\+]?[0-9\s\-\(\)]+$/)
        .withMessage('WhatsApp must contain only numbers, spaces, hyphens, and parentheses'),
    body('address')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Address must be maximum 500 characters'),
    body('map_embed')
        .optional()
        .trim()
        .isLength({ max: 10000 })
        .withMessage('Map embed must be maximum 10,000 characters'),
    body('office_hours')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Office hours must be maximum 1,000 characters'),
    handleValidationErrors
];

module.exports = {
    handleValidationErrors,
    validateBlog,
    validateService,
    validateTeamMember,
    validateInquiry,
    validateSubscriber,
    validateUser,
    validateLogin,
    validateId,
    validatePagination,
    validateSearch,
    validateFileUpload,
    validateContent,
    validateContactSettings,
    sanitizeString,
    sanitizeOptionalString,
    sanitizeEmail
}; 