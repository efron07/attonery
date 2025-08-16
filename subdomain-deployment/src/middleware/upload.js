const multer = require('multer');
const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Create subdirectories based on file type
        const type = req.body.type || 'general';
        const uploadPath = path.join(uploadDir, type);

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Generate unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);

        // Sanitize filename
        const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '_');
        cb(null, `${sanitizedName}-${uniqueSuffix}${ext}`);
    }
});

// File filter function
const fileFilter = (req, file, cb) => {
    const allowedTypes = {
        image: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
        document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
        general: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
    };

    const type = req.body.type || 'general';
    const allowedMimeTypes = allowedTypes[type] || allowedTypes.general;

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Invalid file type. Allowed types for ${type}: ${allowedMimeTypes.join(', ')}`), false);
    }
};

// Configure multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
        files: 10 // Maximum 10 files per request
    }
});

// Single file upload middleware
const uploadSingle = (fieldName = 'file') => {
    return upload.single(fieldName);
};

// Multiple files upload middleware
const uploadMultiple = (fieldName = 'files', maxCount = 10) => {
    return upload.array(fieldName, maxCount);
};

// Specific file type upload middleware
const uploadByType = (type) => {
    return (req, res, next) => {
        req.body.type = type;
        return upload.single('file')(req, res, next);
    };
};

// Error handling middleware
const handleUploadError = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                error: 'File too large',
                code: 'FILE_TOO_LARGE',
                maxSize: process.env.MAX_FILE_SIZE || '5MB'
            });
        }
        if (error.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                error: 'Too many files',
                code: 'TOO_MANY_FILES',
                maxFiles: 10
            });
        }
        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                error: 'Unexpected file field',
                code: 'UNEXPECTED_FILE'
            });
        }
    }

    if (error.message.includes('Invalid file type')) {
        return res.status(400).json({
            error: error.message,
            code: 'INVALID_FILE_TYPE'
        });
    }

    logger.error('Upload error:', error);
    res.status(500).json({
        error: 'File upload failed',
        code: 'UPLOAD_ERROR'
    });
};

// File validation middleware
const validateFile = (req, res, next) => {
    if (!req.file && !req.files) {
        return res.status(400).json({
            error: 'No file uploaded',
            code: 'NO_FILE'
        });
    }

    // Additional validation can be added here
    next();
};

// File cleanup middleware (for failed requests)
const cleanupFiles = (req, res, next) => {
    const originalSend = res.send;

    res.send = function (data) {
        // If response is not successful, cleanup uploaded files
        if (res.statusCode >= 400) {
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) logger.error('Failed to cleanup file:', err);
                });
            }
            if (req.files) {
                req.files.forEach(file => {
                    fs.unlink(file.path, (err) => {
                        if (err) logger.error('Failed to cleanup file:', err);
                    });
                });
            }
        }

        originalSend.call(this, data);
    };

    next();
};

// Get file info
const getFileInfo = (file) => {
    return {
        originalName: file.originalname,
        filename: file.filename,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype,
        url: `/uploads/${file.filename}`,
        uploadedAt: new Date().toISOString()
    };
};

module.exports = {
    upload,
    uploadSingle,
    uploadMultiple,
    uploadByType,
    handleUploadError,
    validateFile,
    cleanupFiles,
    getFileInfo
}; 