const winston = require('winston');
const path = require('path');

// Define log levels
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// Define colors for each level
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

// Tell winston that you want to link the colors
winston.addColors(colors);

// Define which level to log based on environment
const level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};

// Define format for logs
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
);

// Define transports
const transports = [
    // Console transport
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }),

    // File transport for errors
    new winston.transports.File({
        filename: path.join(__dirname, '../../logs/error.log'),
        level: 'error',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        )
    }),

    // File transport for all logs
    new winston.transports.File({
        filename: path.join(__dirname, '../../logs/combined.log'),
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        )
    }),
];

// Create the logger
const logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
});

// Create logs directory if it doesn't exist
const fs = require('fs');
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Add request logging middleware
logger.stream = {
    write: (message) => logger.http(message.trim()),
};

// Performance monitoring methods
logger.startTimer = (operation) => {
    const startTime = Date.now();
    return {
        end: (message = 'Operation completed') => {
            const duration = Date.now() - startTime;
            logger.info(`${operation}: ${message} in ${duration}ms`);
            return duration;
        }
    };
};

// Database query logging
logger.query = (sql, duration, params = []) => {
    if (duration > 1000) {
        logger.warn(`Slow query (${duration}ms): ${sql.substring(0, 100)}...`);
    } else if (process.env.NODE_ENV === 'development') {
        logger.debug(`Query (${duration}ms): ${sql.substring(0, 50)}...`);
    }
};

// API request logging
logger.request = (method, url, duration, statusCode) => {
    const level = statusCode >= 400 ? 'warn' : 'info';
    logger[level](`${method} ${url} - ${statusCode} (${duration}ms)`);
};

// Error logging with context
logger.errorWithContext = (error, context = {}) => {
    logger.error(`${error.message}`, {
        stack: error.stack,
        context,
        timestamp: new Date().toISOString()
    });
};

module.exports = logger; 