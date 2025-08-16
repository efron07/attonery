const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');
const cacheManager = require('../utils/cache');
const dbManager = require('../config/database');

// Rate limiting for login attempts
const loginAttempts = new Map();
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

// Generate JWT token with enhanced security
const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (parseInt(process.env.JWT_EXPIRES_IN) || 24 * 60 * 60) // 24 hours default
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        issuer: 'republica-attorneys',
        audience: 'cms-users'
    });
};

// Verify JWT token with enhanced error handling
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256'],
            issuer: 'republica-attorneys',
            audience: 'cms-users'
        });
    } catch (error) {
        logger.warn(`Token verification failed: ${error.message}`);
        throw error;
    }
};

// Enhanced authentication middleware
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                error: 'Access token required',
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

        const decoded = verifyToken(token);

        // Check if user still exists and is active
        const user = await cacheManager.wrap(
            cacheManager.patterns.user.byId(decoded.id),
            () => dbManager.queryOne('SELECT * FROM users WHERE id = ? AND role = ?', [decoded.id, decoded.role]),
            300 // 5 minutes cache
        );

        if (!user) {
            return res.status(401).json({
                error: 'User not found or inactive',
                code: 'USER_NOT_FOUND'
            });
        }

        req.user = decoded;
        req.userData = user;
        next();
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

        logger.error('Authentication error:', error);
        return res.status(500).json({
            error: 'Authentication failed',
            code: 'AUTH_ERROR'
        });
    }
};

// Role-based authorization middleware
const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: 'Authentication required',
                code: 'AUTH_REQUIRED'
            });
        }

        const userRole = req.user.role;
        const allowedRoles = Array.isArray(roles) ? roles : [roles];

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                error: 'Insufficient permissions',
                code: 'INSUFFICIENT_PERMISSIONS',
                required: allowedRoles,
                current: userRole
            });
        }

        next();
    };
};

// Admin authorization middleware
const authorizeAdmin = authorizeRole('admin');

// Login rate limiting
const checkLoginRateLimit = (ip) => {
    const attempts = loginAttempts.get(ip) || { count: 0, firstAttempt: Date.now() };

    // Reset if lockout period has passed
    if (Date.now() - attempts.firstAttempt > LOCKOUT_DURATION) {
        attempts.count = 0;
        attempts.firstAttempt = Date.now();
    }

    if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
        const remainingTime = Math.ceil((LOCKOUT_DURATION - (Date.now() - attempts.firstAttempt)) / 1000 / 60);
        return {
            allowed: false,
            remainingTime,
            message: `Too many login attempts. Try again in ${remainingTime} minutes.`
        };
    }

    return { allowed: true };
};

// Record login attempt
const recordLoginAttempt = (ip, success) => {
    const attempts = loginAttempts.get(ip) || { count: 0, firstAttempt: Date.now() };

    if (success) {
        // Reset on successful login
        attempts.count = 0;
        attempts.firstAttempt = Date.now();
    } else {
        // Increment failed attempts
        attempts.count++;
        if (attempts.count === 1) {
            attempts.firstAttempt = Date.now();
        }
    }

    loginAttempts.set(ip, attempts);
};

// Enhanced login function
const authenticateUser = async (username, password, ip) => {
    const timer = logger.startTimer('User authentication');

    try {
        // Check rate limiting
        const rateLimitCheck = checkLoginRateLimit(ip);
        if (!rateLimitCheck.allowed) {
            return {
                success: false,
                error: rateLimitCheck.message,
                code: 'RATE_LIMITED'
            };
        }

        // Get user from database with cache
        const user = await cacheManager.wrap(
            cacheManager.patterns.user.byUsername(username),
            () => dbManager.queryOne('SELECT * FROM users WHERE username = ?', [username]),
            300 // 5 minutes cache
        );

        if (!user) {
            recordLoginAttempt(ip, false);
            return {
                success: false,
                error: 'Invalid credentials',
                code: 'INVALID_CREDENTIALS'
            };
        }

        // Check if account is locked
        if (user.locked_until && new Date() < new Date(user.locked_until)) {
            return {
                success: false,
                error: 'Account is temporarily locked',
                code: 'ACCOUNT_LOCKED'
            };
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password_hash);

        if (!isValidPassword) {
            // Update login attempts in database
            await dbManager.query(
                'UPDATE users SET login_attempts = login_attempts + 1 WHERE id = ?',
                [user.id]
            );

            recordLoginAttempt(ip, false);
            return {
                success: false,
                error: 'Invalid credentials',
                code: 'INVALID_CREDENTIALS'
            };
        }

        // Reset login attempts on successful login
        await dbManager.query(
            'UPDATE users SET login_attempts = 0, last_login = CURRENT_TIMESTAMP, locked_until = NULL WHERE id = ?',
            [user.id]
        );

        recordLoginAttempt(ip, true);

        // Generate token
        const token = generateToken(user);

        // Update last login
        await dbManager.query(
            'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
            [user.id]
        );

        // Invalidate user cache
        cacheManager.delete(cacheManager.patterns.user.byId(user.id));
        cacheManager.delete(cacheManager.patterns.user.byUsername(username));

        timer.end('User authenticated successfully');

        return {
            success: true,
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                lastLogin: user.last_login
            }
        };

    } catch (error) {
        timer.end('User authentication failed');
        logger.error('Authentication error:', error);
        return {
            success: false,
            error: 'Authentication failed',
            code: 'AUTH_ERROR'
        };
    }
};

// Logout function
const logout = async (token) => {
    try {
        // Add token to blacklist
        const decoded = verifyToken(token);
        const ttl = decoded.exp - Math.floor(Date.now() / 1000);

        if (ttl > 0) {
            cacheManager.set(`blacklist:${token}`, true, ttl);
        }

        logger.info(`User ${decoded.username} logged out`);
        return { success: true };
    } catch (error) {
        logger.error('Logout error:', error);
        return { success: false, error: 'Logout failed' };
    }
};

// Refresh token function
const refreshToken = async (oldToken) => {
    try {
        const decoded = verifyToken(oldToken);

        // Get fresh user data
        const user = await dbManager.queryOne('SELECT * FROM users WHERE id = ?', [decoded.id]);

        if (!user) {
            throw new Error('User not found');
        }

        // Generate new token
        const newToken = generateToken(user);

        // Blacklist old token
        const ttl = decoded.exp - Math.floor(Date.now() / 1000);
        if (ttl > 0) {
            cacheManager.set(`blacklist:${oldToken}`, true, ttl);
        }

        return {
            success: true,
            token: newToken,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        };
    } catch (error) {
        logger.error('Token refresh error:', error);
        return {
            success: false,
            error: 'Token refresh failed'
        };
    }
};

module.exports = {
    authenticateToken,
    authorizeRole,
    authorizeAdmin,
    authenticateUser,
    logout,
    refreshToken,
    generateToken,
    verifyToken
}; 