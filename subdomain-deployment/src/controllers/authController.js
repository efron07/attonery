const bcrypt = require('bcryptjs');
const { authenticateUser, logout, refreshToken } = require('../middleware/auth');
const { validateLogin, validateUser } = require('../middleware/validation');
const dbManager = require('../config/database');
const logger = require('../utils/logger');
const cacheManager = require('../utils/cache');

class AuthController {
    // Login endpoint
    async login(req, res) {
        const timer = logger.startTimer('Login request');

        try {
            const { username, password } = req.body;
            const clientIP = req.ip || req.connection.remoteAddress;

            logger.info(`Login attempt for user: ${username} from IP: ${clientIP}`);

            const result = await authenticateUser(username, password, clientIP);

            if (!result.success) {
                timer.end('Login failed');
                return res.status(401).json({
                    error: result.error,
                    code: result.code
                });
            }

            timer.end('Login successful');

            res.json({
                success: true,
                message: 'Login successful',
                token: result.token,
                user: result.user,
                expiresIn: process.env.JWT_EXPIRES_IN || '24h'
            });

        } catch (error) {
            timer.end('Login error');
            logger.error('Login controller error:', error);
            res.status(500).json({
                error: 'Internal server error',
                code: 'INTERNAL_ERROR'
            });
        }
    }

    // Logout endpoint
    async logout(req, res) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return res.status(400).json({
                    error: 'No token provided',
                    code: 'TOKEN_MISSING'
                });
            }

            const result = await logout(token);

            if (result.success) {
                res.json({
                    success: true,
                    message: 'Logout successful'
                });
            } else {
                res.status(500).json({
                    error: result.error,
                    code: 'LOGOUT_ERROR'
                });
            }

        } catch (error) {
            logger.error('Logout controller error:', error);
            res.status(500).json({
                error: 'Internal server error',
                code: 'INTERNAL_ERROR'
            });
        }
    }

    // Refresh token endpoint
    async refresh(req, res) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return res.status(400).json({
                    error: 'No token provided',
                    code: 'TOKEN_MISSING'
                });
            }

            const result = await refreshToken(token);

            if (result.success) {
                res.json({
                    success: true,
                    message: 'Token refreshed successfully',
                    token: result.token,
                    user: result.user
                });
            } else {
                res.status(401).json({
                    error: result.error,
                    code: 'REFRESH_ERROR'
                });
            }

        } catch (error) {
            logger.error('Token refresh controller error:', error);
            res.status(500).json({
                error: 'Internal server error',
                code: 'INTERNAL_ERROR'
            });
        }
    }

    // Verify token endpoint
    async verify(req, res) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return res.status(401).json({
                    error: 'No token provided',
                    code: 'TOKEN_MISSING'
                });
            }

            // Check cache for blacklisted tokens
            const blacklisted = cacheManager.get(`blacklist:${token}`);
            if (blacklisted) {
                return res.status(401).json({
                    error: 'Token has been revoked',
                    code: 'TOKEN_REVOKED'
                });
            }

            const jwt = require('jsonwebtoken');
            const decoded = jwt.verify(token, process.env.JWT_SECRET, {
                algorithms: ['HS256'],
                issuer: 'republica-attorneys',
                audience: 'cms-users'
            });

            res.json({
                valid: true,
                user: {
                    id: decoded.id,
                    username: decoded.username,
                    role: decoded.role
                },
                expiresAt: new Date(decoded.exp * 1000).toISOString()
            });

        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    error: 'Token has expired',
                    code: 'TOKEN_EXPIRED'
                });
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    error: 'Invalid token',
                    code: 'TOKEN_INVALID'
                });
            }

            logger.error('Token verification error:', error);
            res.status(500).json({
                error: 'Token verification failed',
                code: 'VERIFICATION_ERROR'
            });
        }
    }

    // Create admin user (for initial setup)
    async createAdmin(req, res) {
        try {
            const { username, password, role = 'admin' } = req.body;

            // Check if admin already exists
            const existingUser = await dbManager.queryOne(
                'SELECT id FROM users WHERE username = ?',
                [username]
            );

            if (existingUser) {
                return res.status(409).json({
                    error: 'User already exists',
                    code: 'USER_EXISTS'
                });
            }

            // Hash password
            const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
            const passwordHash = await bcrypt.hash(password, saltRounds);

            // Create user
            const result = await dbManager.query(
                'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)',
                [username, passwordHash, role]
            );

            const newUser = await dbManager.queryOne(
                'SELECT id, username, role, created_at FROM users WHERE id = ?',
                [result.insertId]
            );

            logger.info(`Admin user created: ${username}`);

            res.status(201).json({
                success: true,
                message: 'Admin user created successfully',
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    role: newUser.role,
                    createdAt: newUser.created_at
                }
            });

        } catch (error) {
            logger.error('Create admin error:', error);
            res.status(500).json({
                error: 'Failed to create admin user',
                code: 'CREATE_ERROR'
            });
        }
    }

    // Get current user profile
    async getProfile(req, res) {
        try {
            const userId = req.user.id;

            const user = await cacheManager.wrap(
                cacheManager.patterns.user.byId(userId),
                () => dbManager.queryOne(
                    'SELECT id, username, role, last_login, created_at FROM users WHERE id = ?',
                    [userId]
                ),
                300 // 5 minutes cache
            );

            if (!user) {
                return res.status(404).json({
                    error: 'User not found',
                    code: 'USER_NOT_FOUND'
                });
            }

            res.json({
                success: true,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    lastLogin: user.last_login,
                    createdAt: user.created_at
                }
            });

        } catch (error) {
            logger.error('Get profile error:', error);
            res.status(500).json({
                error: 'Failed to get user profile',
                code: 'PROFILE_ERROR'
            });
        }
    }

    // Change password
    async changePassword(req, res) {
        try {
            const userId = req.user.id;
            const { currentPassword, newPassword } = req.body;

            // Validate new password
            if (!newPassword || newPassword.length < 8) {
                return res.status(400).json({
                    error: 'New password must be at least 8 characters',
                    code: 'PASSWORD_TOO_SHORT'
                });
            }

            // Get current user with password hash
            const user = await dbManager.queryOne(
                'SELECT password_hash FROM users WHERE id = ?',
                [userId]
            );

            if (!user) {
                return res.status(404).json({
                    error: 'User not found',
                    code: 'USER_NOT_FOUND'
                });
            }

            // Verify current password
            const isValidPassword = await bcrypt.compare(currentPassword, user.password_hash);
            if (!isValidPassword) {
                return res.status(401).json({
                    error: 'Current password is incorrect',
                    code: 'INVALID_CURRENT_PASSWORD'
                });
            }

            // Hash new password
            const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
            const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

            // Update password
            await dbManager.query(
                'UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                [newPasswordHash, userId]
            );

            // Invalidate user cache
            cacheManager.delete(cacheManager.patterns.user.byId(userId));

            logger.info(`Password changed for user ID: ${userId}`);

            res.json({
                success: true,
                message: 'Password changed successfully'
            });

        } catch (error) {
            logger.error('Change password error:', error);
            res.status(500).json({
                error: 'Failed to change password',
                code: 'PASSWORD_CHANGE_ERROR'
            });
        }
    }

    // Get authentication statistics
    async getAuthStats(req, res) {
        try {
            const stats = {
                totalUsers: await dbManager.queryOne('SELECT COUNT(*) as count FROM users'),
                activeUsers: await dbManager.queryOne('SELECT COUNT(*) as count FROM users WHERE last_login > DATE_SUB(NOW(), INTERVAL 30 DAY)'),
                recentLogins: await dbManager.queryOne('SELECT COUNT(*) as count FROM users WHERE last_login > DATE_SUB(NOW(), INTERVAL 7 DAY)'),
                cacheStats: cacheManager.getStats()
            };

            res.json({
                success: true,
                stats
            });

        } catch (error) {
            logger.error('Get auth stats error:', error);
            res.status(500).json({
                error: 'Failed to get authentication statistics',
                code: 'STATS_ERROR'
            });
        }
    }
}

module.exports = new AuthController(); 