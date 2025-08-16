require('express-async-errors');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const path = require('path');

// Import utilities and configs
const logger = require('./utils/logger');
const cacheManager = require('./utils/cache');
const dbManager = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
const serviceRoutes = require('./routes/services');
const teamRoutes = require('./routes/team');
const contentRoutes = require('./routes/content');
const publicRoutes = require('./routes/public');
const uploadRoutes = require('./routes/upload');

// Load environment variables with fallbacks
const config = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    PORT: process.env.PORT || 3001,

    // Database Configuration
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || 3306,
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || 'cms_database',
    DB_CHARSET: process.env.DB_CHARSET || 'utf8mb4',
    DB_CONNECTION_LIMIT: process.env.DB_CONNECTION_LIMIT || 20,
    DB_QUEUE_LIMIT: process.env.DB_QUEUE_LIMIT || 0,

    // JWT Configuration
    JWT_SECRET: process.env.JWT_SECRET || 'your-fallback-jwt-secret-change-this',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',

    // CORS Configuration
    CORS_ORIGINS: process.env.CORS_ORIGINS || 'https://republicaattorneys.co.tz,https://www.republicaattorneys.co.tz,https://backend.republicaattorneys.co.tz',

    // File Upload Configuration
    UPLOAD_PATH: process.env.UPLOAD_PATH || 'uploads',
    MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || 5242880,

    // Admin Credentials
    ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'admin@republicaattorneys.co.tz',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'republica2024',
    BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || 12,

    // Rate Limiting
    RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW || 15,
    RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX || 100,
    SLOW_DOWN_WINDOW: process.env.SLOW_DOWN_WINDOW || 15,
    SLOW_DOWN_DELAY: process.env.SLOW_DOWN_DELAY || 500
};

// Set environment variables for other modules
Object.keys(config).forEach(key => {
    process.env[key] = config[key];
});

logger.info('🔧 Configuration loaded:', {
    NODE_ENV: config.NODE_ENV,
    PORT: config.PORT,
    DB_HOST: config.DB_HOST,
    DB_NAME: config.DB_NAME,
    CORS_ORIGINS: config.CORS_ORIGINS
});

const app = express();
const PORT = process.env.PORT || 3001;

// Enhanced security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: ["'self'"],
            connectSrc: ["'self'"],
            frameSrc: ["'none'"],
            objectSrc: ["'none'"]
        }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Enhanced rate limiting
const limiter = rateLimit({
    windowMs: config.RATE_LIMIT_WINDOW * 60 * 1000, // 15 minutes
    max: config.RATE_LIMIT_MAX, // limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again later.',
        code: 'RATE_LIMIT_EXCEEDED'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
        // Skip rate limiting for health checks
        return req.path === '/api/health';
    }
});

// Slow down middleware for additional protection
const speedLimiter = slowDown({
    windowMs: config.SLOW_DOWN_WINDOW * 60 * 1000, // 15 minutes
    delayAfter: 50, // allow 50 requests per 15 minutes, then...
    delayMs: config.SLOW_DOWN_DELAY, // begin adding 500ms of delay per request above 50
    maxDelayMs: 20000, // maximum delay of 20 seconds
    skip: (req) => {
        // Skip slow down for health checks
        return req.path === '/api/health';
    }
});

app.use('/api/', limiter);
app.use('/api/', speedLimiter);

// Enhanced CORS configuration
const corsOptions = {
    origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [
        'http://localhost:3001',
        'http://localhost:3000',
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'http://localhost:5176',
        'http://localhost:5177',
        'http://localhost:5178',
        'http://localhost:5179',
        'http://localhost:5180',
        'http://localhost:5181',
        'http://localhost:5182',
        'http://localhost:5183',
        'http://localhost:5184'
    ],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Enhanced body parsing middleware
app.use(express.json({
    limit: '10mb',
    verify: (req, res, buf) => {
        try {
            JSON.parse(buf);
        } catch (e) {
            res.status(400).json({ error: 'Invalid JSON' });
            throw new Error('Invalid JSON');
        }
    }
}));
app.use(express.urlencoded({
    extended: true,
    limit: '10mb',
    parameterLimit: 1000
}));

// Enhanced compression middleware
app.use(compression({
    level: 6,
    threshold: 1024,
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    }
}));

// Enhanced logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev', { stream: logger.stream }));
} else {
    app.use(morgan('combined', { stream: logger.stream }));
}

// Request timing middleware
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.request(req.method, req.originalUrl, duration, res.statusCode);
    });
    next();
});

// Serve uploaded files with caching
app.use('/uploads', express.static(path.join(__dirname, '../', process.env.UPLOAD_PATH || 'uploads'), {
    maxAge: '1d',
    etag: true,
    lastModified: true
}));

// Health check endpoint with detailed information
app.get('/api/health', async (req, res) => {
    try {
        const health = {
            status: 'OK',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV,
            version: '2.0.0',
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            database: {
                status: 'unknown'
            },
            cache: cacheManager.health()
        };

        // Check database health
        try {
            await dbManager.query('SELECT 1');
            health.database.status = 'connected';
            health.database.stats = dbManager.getStats();
        } catch (error) {
            health.database.status = 'disconnected';
            health.database.error = error.message;
        }

        const statusCode = health.database.status === 'connected' ? 200 : 503;
        res.status(statusCode).json(health);
    } catch (error) {
        logger.error('Health check error:', error);
        res.status(500).json({
            status: 'ERROR',
            error: 'Health check failed'
        });
    }
});

// Cache statistics endpoint (admin only)
app.get('/api/cache/stats', async (req, res) => {
    try {
        const stats = cacheManager.getStats();
        res.json({
            success: true,
            stats
        });
    } catch (error) {
        logger.error('Cache stats error:', error);
        res.status(500).json({
            error: 'Failed to get cache statistics'
        });
    }
});

// Clear cache endpoint (admin only)
app.post('/api/cache/clear', async (req, res) => {
    try {
        cacheManager.flush();
        res.json({
            success: true,
            message: 'Cache cleared successfully'
        });
    } catch (error) {
        logger.error('Cache clear error:', error);
        res.status(500).json({
            error: 'Failed to clear cache'
        });
    }
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api', publicRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../dist'), {
        maxAge: '1d',
        etag: true,
        lastModified: true
    }));

    // Handle React Router (return `index.html` for all non-API routes)
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
}

// Enhanced error handling middleware
app.use((err, req, res, next) => {
    logger.errorWithContext(err, {
        path: req.path,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });

    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({
            error: 'Invalid JSON in request body',
            code: 'INVALID_JSON'
        });
    }

    if (err.type === 'entity.too.large') {
        return res.status(413).json({
            error: 'Request entity too large',
            code: 'PAYLOAD_TOO_LARGE'
        });
    }

    res.status(500).json({
        error: 'Internal server error',
        code: 'INTERNAL_ERROR',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
        timestamp: new Date().toISOString()
    });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({
        error: 'API endpoint not found',
        code: 'ENDPOINT_NOT_FOUND',
        path: req.originalUrl
    });
});

// Graceful shutdown
const gracefulShutdown = async (signal) => {
    logger.info(`Received ${signal}. Graceful shutdown...`);

    try {
        // Close database connections
        await dbManager.close();

        // Clear cache
        cacheManager.flush();

        logger.info('Graceful shutdown completed');
        process.exit(0);
    } catch (error) {
        logger.error('Error during graceful shutdown:', error);
        process.exit(1);
    }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Unhandled promise rejection handler
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Uncaught exception handler
process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    gracefulShutdown('uncaughtException');
});

// Start server
const startServer = async () => {
    try {
        const timer = logger.startTimer('Server startup');

        // Initialize database connection
        await dbManager.connect();

        app.listen(PORT, () => {
            timer.end('Server started successfully');
            logger.info(`🚀 Server running on port ${PORT}`);
            logger.info(`📊 Environment: ${process.env.NODE_ENV}`);
            logger.info(`🗄️  Database: MySQL (${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME})`);
            logger.info(`🔒 CORS origins: ${process.env.CORS_ORIGINS}`);
            logger.info(`⚡ Cache enabled: ${cacheManager.health().status}`);
        });
    } catch (error) {
        logger.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app; 