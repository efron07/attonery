const NodeCache = require('node-cache');
const logger = require('./logger');

class CacheManager {
    constructor() {
        // Initialize cache with optimized settings
        this.cache = new NodeCache({
            stdTTL: 300, // 5 minutes default TTL
            checkperiod: 60, // Check for expired keys every 60 seconds
            useClones: false, // Disable cloning for better performance
            deleteOnExpire: true, // Automatically delete expired keys
            maxKeys: 1000 // Maximum number of keys in cache
        });

        // Cache statistics
        this.stats = {
            hits: 0,
            misses: 0,
            sets: 0,
            deletes: 0
        };

        // Set up cache event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.cache.on('expired', (key, value) => {
            logger.debug(`Cache key expired: ${key}`);
        });

        this.cache.on('flush', () => {
            logger.info('Cache flushed');
        });

        this.cache.on('del', (key, value) => {
            this.stats.deletes++;
            logger.debug(`Cache key deleted: ${key}`);
        });
    }

    // Get value from cache
    get(key) {
        const value = this.cache.get(key);
        if (value !== undefined) {
            this.stats.hits++;
            logger.debug(`Cache hit: ${key}`);
            return value;
        } else {
            this.stats.misses++;
            logger.debug(`Cache miss: ${key}`);
            return null;
        }
    }

    // Set value in cache
    set(key, value, ttl = 300) {
        this.cache.set(key, value, ttl);
        this.stats.sets++;
        logger.debug(`Cache set: ${key} (TTL: ${ttl}s)`);
    }

    // Delete key from cache
    delete(key) {
        const deleted = this.cache.del(key);
        if (deleted > 0) {
            logger.debug(`Cache delete: ${key}`);
        }
        return deleted > 0;
    }

    // Clear all cache
    flush() {
        this.cache.flushAll();
        logger.info('Cache flushed');
    }

    // Get cache statistics
    getStats() {
        const cacheStats = this.cache.getStats();
        return {
            ...this.stats,
            keys: cacheStats.keys,
            hits: cacheStats.hits,
            misses: cacheStats.misses,
            hitRate: cacheStats.hits / (cacheStats.hits + cacheStats.misses) * 100
        };
    }

    // Cache wrapper for async functions
    async wrap(key, fn, ttl = 300) {
        const cached = this.get(key);
        if (cached !== null) {
            return cached;
        }

        try {
            const result = await fn();
            this.set(key, result, ttl);
            return result;
        } catch (error) {
            logger.error(`Cache wrap error for key ${key}:`, error);
            throw error;
        }
    }

    // Generate cache key from parameters
    generateKey(prefix, ...params) {
        const paramString = params.map(p =>
            typeof p === 'object' ? JSON.stringify(p) : String(p)
        ).join(':');
        return `${prefix}:${paramString}`;
    }

    // Cache patterns for common operations
    patterns = {
        // Blog patterns
        blog: {
            all: 'blogs:all',
            byId: (id) => `blog:${id}`,
            byCategory: (category) => `blogs:category:${category}`,
            featured: 'blogs:featured',
            recent: (limit) => `blogs:recent:${limit}`
        },

        // Service patterns
        service: {
            all: 'services:all',
            byId: (id) => `service:${id}`,
            active: 'services:active',
            bySlug: (slug) => `service:slug:${slug}`
        },

        // Team patterns
        team: {
            all: 'team:all',
            byId: (id) => `team:${id}`,
            active: 'team:active'
        },

        // Content patterns
        content: {
            about: 'content:about',
            contact: 'content:contact'
        },

        // User patterns
        user: {
            byId: (id) => `user:${id}`,
            byUsername: (username) => `user:username:${username}`
        }
    };

    // Invalidate cache by pattern
    invalidatePattern(pattern) {
        const keys = this.cache.keys();
        const matchingKeys = keys.filter(key => key.includes(pattern));

        matchingKeys.forEach(key => {
            this.delete(key);
        });

        logger.info(`Invalidated ${matchingKeys.length} cache keys matching pattern: ${pattern}`);
        return matchingKeys.length;
    }

    // Invalidate all blog-related cache
    invalidateBlogs() {
        return this.invalidatePattern('blog');
    }

    // Invalidate all service-related cache
    invalidateServices() {
        return this.invalidatePattern('service');
    }

    // Invalidate all team-related cache
    invalidateTeam() {
        return this.invalidatePattern('team');
    }

    // Invalidate all content-related cache
    invalidateContent() {
        return this.invalidatePattern('content');
    }

    // Health check
    health() {
        try {
            const stats = this.getStats();
            return {
                status: 'healthy',
                stats,
                memory: process.memoryUsage()
            };
        } catch (error) {
            return {
                status: 'unhealthy',
                error: error.message
            };
        }
    }
}

// Create singleton instance
const cacheManager = new CacheManager();

module.exports = cacheManager; 