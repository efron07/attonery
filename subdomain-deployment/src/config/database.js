const mysql = require('mysql2/promise');
const logger = require('../utils/logger');

class DatabaseManager {
    constructor() {
        this.pool = null;
        this.connection = null;
        this.queryCount = 0;
        this.slowQueryThreshold = 1000; // 1 second
    }

    async connect() {
        try {
            // Optimized connection pool configuration
            this.pool = mysql.createPool({
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT) || 3306,
                user: process.env.DB_USER || 'root',
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME || 'cms_database',
                charset: process.env.DB_CHARSET || 'utf8mb4',

                // Performance optimizations
                waitForConnections: true,
                connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 20,
                queueLimit: parseInt(process.env.DB_QUEUE_LIMIT) || 0,

                // Connection timeout settings
                acquireTimeout: 60000,
                timeout: 60000,

                // Query timeout
                queryTimeout: 30000,

                // Enable multiple statements for batch operations
                multipleStatements: false,

                // Connection pool settings
                maxIdle: 60000,
                idleTimeout: 60000,

                // Enable connection debugging in development
                debug: process.env.NODE_ENV === 'development' ? ['ComQueryPacket'] : false
            });

            // Test connection
            this.connection = await this.pool.getConnection();
            logger.info('✅ MySQL database connected successfully');

            // Initialize tables with optimized schema
            await this.initializeTables();

            // Release the test connection
            this.connection.release();

        } catch (error) {
            logger.error('❌ Database connection failed:', error);
            throw error;
        }
    }

    async initializeTables() {
        try {
            // Users table with optimized indexes
            await this.pool.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          role VARCHAR(50) DEFAULT 'admin',
          last_login TIMESTAMP NULL,
          login_attempts INT DEFAULT 0,
          locked_until TIMESTAMP NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_username (username),
          INDEX idx_role (role),
          INDEX idx_last_login (last_login)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

            // Blogs table with optimized indexes and partitioning
            await this.pool.execute(`
        CREATE TABLE IF NOT EXISTS blogs (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content LONGTEXT NOT NULL,
          excerpt TEXT,
          date DATE NOT NULL,
          author VARCHAR(255) NOT NULL,
          read_time VARCHAR(50) DEFAULT '5 min read',
          views INT DEFAULT 0,
          category VARCHAR(100) DEFAULT 'Legal',
          meta_description TEXT,
          keywords TEXT,
          published BOOLEAN DEFAULT 1,
          featured BOOLEAN DEFAULT 0,
          slug VARCHAR(255) UNIQUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_published_date (published, date),
          INDEX idx_category (category),
          INDEX idx_author (author),
          INDEX idx_slug (slug),
          INDEX idx_featured (featured),
          FULLTEXT idx_search (title, content, excerpt)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

            // Services table with optimized structure
            await this.pool.execute(`
        CREATE TABLE IF NOT EXISTS services (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          icon VARCHAR(255),
          link VARCHAR(255),
          gradient VARCHAR(100),
          order_index INT DEFAULT 0,
          active BOOLEAN DEFAULT 1,
          overview LONGTEXT,
          features TEXT,
          process_steps TEXT,
          requirements TEXT,
          benefits TEXT,
          meta_description TEXT,
          keywords TEXT,
          slug VARCHAR(255) UNIQUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_active_order (active, order_index),
          INDEX idx_slug (slug),
          FULLTEXT idx_search (title, description, overview)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

            // Team members table
            await this.pool.execute(`
        CREATE TABLE IF NOT EXISTS team_members (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          title VARCHAR(255) NOT NULL,
          bio TEXT,
          image VARCHAR(255),
          specialties TEXT,
          experience VARCHAR(255),
          order_index INT DEFAULT 0,
          active BOOLEAN DEFAULT 1,
          email VARCHAR(255),
          linkedin VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_active_order (active, order_index),
          INDEX idx_name (name)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

            // About content table
            await this.pool.execute(`
        CREATE TABLE IF NOT EXISTS about_content (
          id INT AUTO_INCREMENT PRIMARY KEY,
          intro TEXT,
          who_we_are TEXT,
          vision TEXT,
          mission TEXT,
          company_values TEXT,
          impact_stats TEXT,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

            // Contact settings table
            await this.pool.execute(`
        CREATE TABLE IF NOT EXISTS contact_settings (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255),
          phone VARCHAR(50),
          whatsapp VARCHAR(50),
          address TEXT,
          map_embed LONGTEXT,
          office_hours TEXT,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

            // Newsletter subscribers table with optimized indexes
            await this.pool.execute(`
        CREATE TABLE IF NOT EXISTS subscribers (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          active BOOLEAN DEFAULT 1,
          unsubscribed_at TIMESTAMP NULL,
          INDEX idx_email (email),
          INDEX idx_active (active),
          INDEX idx_subscribed_at (subscribed_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

            // Contact inquiries table with optimized indexes
            await this.pool.execute(`
        CREATE TABLE IF NOT EXISTS inquiries (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          phone VARCHAR(50) NOT NULL,
          email VARCHAR(255),
          service VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          status VARCHAR(50) DEFAULT 'new',
          priority VARCHAR(20) DEFAULT 'normal',
          assigned_to INT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_status (status),
          INDEX idx_created_at (created_at),
          INDEX idx_email (email),
          INDEX idx_service (service),
          INDEX idx_priority (priority)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

            // API rate limiting table
            await this.pool.execute(`
        CREATE TABLE IF NOT EXISTS rate_limits (
          id INT AUTO_INCREMENT PRIMARY KEY,
          ip_address VARCHAR(45) NOT NULL,
          endpoint VARCHAR(255) NOT NULL,
          request_count INT DEFAULT 1,
          window_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_ip_endpoint (ip_address, endpoint),
          INDEX idx_window_start (window_start)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

            // Create additional performance indexes
            await this.createPerformanceIndexes();

            logger.info('✅ Database tables initialized successfully');
        } catch (error) {
            logger.error('❌ Database initialization failed:', error);
            throw error;
        }
    }

    async createPerformanceIndexes() {
        try {
            const indexes = [
                // Composite indexes for better query performance
                { name: 'idx_blogs_published_date_category', table: 'blogs', columns: 'published, date, category' },
                { name: 'idx_services_active_order_slug', table: 'services', columns: 'active, order_index, slug' },
                { name: 'idx_team_active_order_name', table: 'team_members', columns: 'active, order_index, name' },
                { name: 'idx_inquiries_status_created', table: 'inquiries', columns: 'status, created_at' },
                { name: 'idx_subscribers_active_subscribed', table: 'subscribers', columns: 'active, subscribed_at' }
            ];

            for (const index of indexes) {
                const indexExists = await this.indexExists(index.name, index.table);
                if (!indexExists) {
                    await this.pool.execute(`CREATE INDEX ${index.name} ON ${index.table}(${index.columns})`);
                    logger.info(`Created index: ${index.name}`);
                }
            }
        } catch (error) {
            logger.error('Error creating performance indexes:', error);
        }
    }

    async indexExists(indexName, tableName) {
        try {
            const [rows] = await this.pool.execute(`
        SELECT COUNT(*) as count 
        FROM information_schema.statistics 
        WHERE table_schema = ? 
        AND table_name = ? 
        AND index_name = ?
      `, [process.env.DB_NAME || 'cms_database', tableName, indexName]);

            return rows[0].count > 0;
        } catch (error) {
            return false;
        }
    }

    getPool() {
        return this.pool;
    }

    async close() {
        if (this.pool) {
            await this.pool.end();
            logger.info('✅ Database connection closed');
        }
    }

    // Optimized query execution with performance monitoring
    async query(sql, params = []) {
        const startTime = Date.now();
        this.queryCount++;

        try {
            const [rows] = await this.pool.execute(sql, params);
            const duration = Date.now() - startTime;

            // Log slow queries
            if (duration > this.slowQueryThreshold) {
                logger.warn(`Slow query detected (${duration}ms): ${sql.substring(0, 100)}...`);
            }

            // Log query statistics in development
            if (process.env.NODE_ENV === 'development') {
                logger.debug(`Query executed in ${duration}ms: ${sql.substring(0, 50)}...`);
            }

            return rows;
        } catch (error) {
            const duration = Date.now() - startTime;
            logger.error(`Query failed after ${duration}ms: ${error.message}`, {
                sql: sql.substring(0, 100),
                params: params.slice(0, 3)
            });
            throw error;
        }
    }

    // Optimized single row query
    async queryOne(sql, params = []) {
        const rows = await this.query(sql, params);
        return rows[0];
    }

    // Batch query execution for better performance
    async batchQuery(queries) {
        const startTime = Date.now();
        const results = [];

        try {
            for (const { sql, params = [] } of queries) {
                const result = await this.query(sql, params);
                results.push(result);
            }

            const duration = Date.now() - startTime;
            logger.debug(`Batch query executed in ${duration}ms (${queries.length} queries)`);

            return results;
        } catch (error) {
            logger.error('Batch query failed:', error);
            throw error;
        }
    }

    // Get database statistics
    getStats() {
        return {
            queryCount: this.queryCount,
            poolSize: this.pool && this.pool.config ? this.pool.config.connectionLimit : 0,
            activeConnections: this.pool && this.pool._allConnections ? this.pool._allConnections.length : 0
        };
    }
}

module.exports = new DatabaseManager(); 