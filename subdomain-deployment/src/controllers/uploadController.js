const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');
const { getFileInfo } = require('../middleware/upload');

class UploadController {
    // Upload single file
    async uploadSingle(req, res) {
        const timer = logger.startTimer('Upload single file');

        try {
            if (!req.file) {
                return res.status(400).json({
                    error: 'No file uploaded',
                    code: 'NO_FILE'
                });
            }

            const fileInfo = getFileInfo(req.file);

            timer.end('File uploaded successfully');

            res.json({
                success: true,
                message: 'File uploaded successfully',
                data: fileInfo
            });

        } catch (error) {
            timer.end('Upload single file failed');
            logger.error('Upload single file error:', error);
            res.status(500).json({
                error: 'Failed to upload file',
                code: 'UPLOAD_ERROR'
            });
        }
    }

    // Upload multiple files
    async uploadMultiple(req, res) {
        const timer = logger.startTimer('Upload multiple files');

        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({
                    error: 'No files uploaded',
                    code: 'NO_FILES'
                });
            }

            const filesInfo = req.files.map(file => getFileInfo(file));

            timer.end(`Uploaded ${filesInfo.length} files successfully`);

            res.json({
                success: true,
                message: `${filesInfo.length} files uploaded successfully`,
                data: filesInfo
            });

        } catch (error) {
            timer.end('Upload multiple files failed');
            logger.error('Upload multiple files error:', error);
            res.status(500).json({
                error: 'Failed to upload files',
                code: 'UPLOAD_ERROR'
            });
        }
    }

    // Upload image
    async uploadImage(req, res) {
        const timer = logger.startTimer('Upload image');

        try {
            if (!req.file) {
                return res.status(400).json({
                    error: 'No image uploaded',
                    code: 'NO_IMAGE'
                });
            }

            // Validate image file
            const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedMimeTypes.includes(req.file.mimetype)) {
                // Clean up invalid file
                fs.unlink(req.file.path, (err) => {
                    if (err) logger.error('Failed to cleanup invalid image:', err);
                });

                return res.status(400).json({
                    error: 'Invalid image format. Allowed formats: JPEG, JPG, PNG, GIF, WebP',
                    code: 'INVALID_IMAGE_FORMAT'
                });
            }

            const fileInfo = getFileInfo(req.file);

            timer.end('Image uploaded successfully');

            res.json({
                success: true,
                message: 'Image uploaded successfully',
                data: fileInfo
            });

        } catch (error) {
            timer.end('Upload image failed');
            logger.error('Upload image error:', error);
            res.status(500).json({
                error: 'Failed to upload image',
                code: 'UPLOAD_ERROR'
            });
        }
    }

    // Upload document
    async uploadDocument(req, res) {
        const timer = logger.startTimer('Upload document');

        try {
            if (!req.file) {
                return res.status(400).json({
                    error: 'No document uploaded',
                    code: 'NO_DOCUMENT'
                });
            }

            // Validate document file
            const allowedMimeTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'text/plain'
            ];

            if (!allowedMimeTypes.includes(req.file.mimetype)) {
                // Clean up invalid file
                fs.unlink(req.file.path, (err) => {
                    if (err) logger.error('Failed to cleanup invalid document:', err);
                });

                return res.status(400).json({
                    error: 'Invalid document format. Allowed formats: PDF, DOC, DOCX, TXT',
                    code: 'INVALID_DOCUMENT_FORMAT'
                });
            }

            const fileInfo = getFileInfo(req.file);

            timer.end('Document uploaded successfully');

            res.json({
                success: true,
                message: 'Document uploaded successfully',
                data: fileInfo
            });

        } catch (error) {
            timer.end('Upload document failed');
            logger.error('Upload document error:', error);
            res.status(500).json({
                error: 'Failed to upload document',
                code: 'UPLOAD_ERROR'
            });
        }
    }

    // Delete file
    async deleteFile(req, res) {
        const timer = logger.startTimer('Delete file');

        try {
            const { filename } = req.params;
            const { type = 'general' } = req.query;

            const filePath = path.join(__dirname, '../../uploads', type, filename);

            // Check if file exists
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({
                    error: 'File not found',
                    code: 'FILE_NOT_FOUND'
                });
            }

            // Delete file
            fs.unlink(filePath, (err) => {
                if (err) {
                    timer.end('Delete file failed');
                    logger.error('Delete file error:', err);
                    return res.status(500).json({
                        error: 'Failed to delete file',
                        code: 'DELETE_ERROR'
                    });
                }

                timer.end('File deleted successfully');

                res.json({
                    success: true,
                    message: 'File deleted successfully',
                    data: {
                        filename,
                        deletedAt: new Date().toISOString()
                    }
                });
            });

        } catch (error) {
            timer.end('Delete file failed');
            logger.error('Delete file error:', error);
            res.status(500).json({
                error: 'Failed to delete file',
                code: 'DELETE_ERROR'
            });
        }
    }

    // Get file info
    async getFileInfo(req, res) {
        const timer = logger.startTimer('Get file info');

        try {
            const { filename } = req.params;
            const { type = 'general' } = req.query;

            const filePath = path.join(__dirname, '../../uploads', type, filename);

            // Check if file exists
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({
                    error: 'File not found',
                    code: 'FILE_NOT_FOUND'
                });
            }

            // Get file stats
            const stats = fs.statSync(filePath);
            const fileInfo = {
                filename,
                path: filePath,
                size: stats.size,
                created: stats.birthtime,
                modified: stats.mtime,
                url: `/uploads/${type}/${filename}`,
                type: path.extname(filename).toLowerCase()
            };

            timer.end('File info retrieved');

            res.json({
                success: true,
                data: fileInfo
            });

        } catch (error) {
            timer.end('Get file info failed');
            logger.error('Get file info error:', error);
            res.status(500).json({
                error: 'Failed to get file info',
                code: 'FILE_INFO_ERROR'
            });
        }
    }

    // List files
    async listFiles(req, res) {
        const timer = logger.startTimer('List files');

        try {
            const { type = 'general', limit = 50, offset = 0 } = req.query;
            const uploadPath = path.join(__dirname, '../../uploads', type);

            // Check if directory exists
            if (!fs.existsSync(uploadPath)) {
                return res.json({
                    success: true,
                    data: [],
                    pagination: {
                        limit: parseInt(limit),
                        offset: parseInt(offset),
                        count: 0
                    }
                });
            }

            // Read directory
            const files = fs.readdirSync(uploadPath);
            const fileList = [];

            for (const filename of files) {
                const filePath = path.join(uploadPath, filename);
                const stats = fs.statSync(filePath);

                if (stats.isFile()) {
                    fileList.push({
                        filename,
                        size: stats.size,
                        created: stats.birthtime,
                        modified: stats.mtime,
                        url: `/uploads/${type}/${filename}`,
                        type: path.extname(filename).toLowerCase()
                    });
                }
            }

            // Sort by modified date (newest first)
            fileList.sort((a, b) => new Date(b.modified) - new Date(a.modified));

            // Apply pagination
            const paginatedFiles = fileList.slice(parseInt(offset), parseInt(offset) + parseInt(limit));

            timer.end(`Listed ${paginatedFiles.length} files`);

            res.json({
                success: true,
                data: paginatedFiles,
                pagination: {
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                    count: paginatedFiles.length,
                    total: fileList.length
                }
            });

        } catch (error) {
            timer.end('List files failed');
            logger.error('List files error:', error);
            res.status(500).json({
                error: 'Failed to list files',
                code: 'LIST_FILES_ERROR'
            });
        }
    }

    // Get upload statistics
    async getUploadStats(req, res) {
        const timer = logger.startTimer('Get upload stats');

        try {
            const uploadPath = path.join(__dirname, '../../uploads');
            const stats = {
                totalFiles: 0,
                totalSize: 0,
                byType: {
                    image: { count: 0, size: 0 },
                    document: { count: 0, size: 0 },
                    general: { count: 0, size: 0 }
                }
            };

            // Get stats for each type
            const types = ['image', 'document', 'general'];

            for (const type of types) {
                const typePath = path.join(uploadPath, type);

                if (fs.existsSync(typePath)) {
                    const files = fs.readdirSync(typePath);

                    for (const filename of files) {
                        const filePath = path.join(typePath, filename);
                        const fileStats = fs.statSync(filePath);

                        if (fileStats.isFile()) {
                            stats.totalFiles++;
                            stats.totalSize += fileStats.size;
                            stats.byType[type].count++;
                            stats.byType[type].size += fileStats.size;
                        }
                    }
                }
            }

            timer.end('Upload stats retrieved');

            res.json({
                success: true,
                data: stats
            });

        } catch (error) {
            timer.end('Get upload stats failed');
            logger.error('Get upload stats error:', error);
            res.status(500).json({
                error: 'Failed to get upload statistics',
                code: 'UPLOAD_STATS_ERROR'
            });
        }
    }
}

module.exports = new UploadController(); 