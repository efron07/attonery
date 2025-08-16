const dbManager = require('../config/database');
const logger = require('../utils/logger');
const cacheManager = require('../utils/cache');

class BlogController {
    // Get all blogs (public) with caching and pagination
    async getAllBlogs(req, res) {
        const timer = logger.startTimer('Get all blogs');

        try {
            const { category, limit = 20, offset = 0, featured, search } = req.query;

            // Generate cache key based on query parameters
            const cacheKey = cacheManager.generateKey(
                'blogs:all',
                category || 'all',
                limit,
                offset,
                featured || 'all',
                search || 'none'
            );

            const blogs = await cacheManager.wrap(cacheKey, async () => {
                let query = 'SELECT * FROM blogs WHERE published = 1';
                let params = [];

                // Add category filter
                if (category && category !== 'All') {
                    query += ' AND category = ?';
                    params.push(category);
                }

                // Add featured filter
                if (featured === 'true') {
                    query += ' AND featured = 1';
                }

                // Add search filter
                if (search) {
                    query += ' AND (title LIKE ? OR content LIKE ? OR excerpt LIKE ?)';
                    const searchTerm = `%${search}%`;
                    params.push(searchTerm, searchTerm, searchTerm);
                }

                query += ' ORDER BY date DESC LIMIT ? OFFSET ?';
                params.push(parseInt(limit), parseInt(offset));

                return await dbManager.query(query, params);
            }, 300); // 5 minutes cache

            timer.end(`Retrieved ${blogs.length} blogs`);

            res.json({
                success: true,
                data: blogs,
                pagination: {
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                    count: blogs.length
                }
            });

        } catch (error) {
            timer.end('Get all blogs failed');
            logger.error('Get all blogs error:', error);
            res.status(500).json({
                error: 'Failed to fetch blogs',
                code: 'BLOG_FETCH_ERROR'
            });
        }
    }

    // Get single blog (public) with caching
    async getBlogById(req, res) {
        const timer = logger.startTimer('Get blog by ID');

        try {
            const { id } = req.params;

            const blog = await cacheManager.wrap(
                cacheManager.patterns.blog.byId(id),
                async () => {
                    const blog = await dbManager.queryOne(
                        'SELECT * FROM blogs WHERE id = ? AND published = 1',
                        [id]
                    );

                    if (blog) {
                        // Increment view count asynchronously (don't wait for it)
                        dbManager.query(
                            'UPDATE blogs SET views = views + 1 WHERE id = ?',
                            [id]
                        ).catch(err => logger.error('Failed to increment view count:', err));
                    }

                    return blog;
                },
                600 // 10 minutes cache for individual blogs
            );

            if (!blog) {
                timer.end('Blog not found');
                return res.status(404).json({
                    error: 'Blog not found',
                    code: 'BLOG_NOT_FOUND'
                });
            }

            timer.end('Blog retrieved successfully');

            res.json({
                success: true,
                data: blog
            });

        } catch (error) {
            timer.end('Get blog by ID failed');
            logger.error('Get blog by ID error:', error);
            res.status(500).json({
                error: 'Failed to fetch blog',
                code: 'BLOG_FETCH_ERROR'
            });
        }
    }

    // Get featured blogs
    async getFeaturedBlogs(req, res) {
        const timer = logger.startTimer('Get featured blogs');

        try {
            const { limit = 5 } = req.query;

            const blogs = await cacheManager.wrap(
                cacheManager.patterns.blog.featured,
                () => dbManager.query(
                    'SELECT * FROM blogs WHERE published = 1 AND featured = 1 ORDER BY date DESC LIMIT ?',
                    [parseInt(limit)]
                ),
                300 // 5 minutes cache
            );

            timer.end(`Retrieved ${blogs.length} featured blogs`);

            res.json({
                success: true,
                data: blogs
            });

        } catch (error) {
            timer.end('Get featured blogs failed');
            logger.error('Get featured blogs error:', error);
            res.status(500).json({
                error: 'Failed to fetch featured blogs',
                code: 'BLOG_FETCH_ERROR'
            });
        }
    }

    // Get recent blogs
    async getRecentBlogs(req, res) {
        const timer = logger.startTimer('Get recent blogs');

        try {
            const { limit = 10 } = req.query;

            const blogs = await cacheManager.wrap(
                cacheManager.patterns.blog.recent(limit),
                () => dbManager.query(
                    'SELECT * FROM blogs WHERE published = 1 ORDER BY date DESC LIMIT ?',
                    [parseInt(limit)]
                ),
                300 // 5 minutes cache
            );

            timer.end(`Retrieved ${blogs.length} recent blogs`);

            res.json({
                success: true,
                data: blogs
            });

        } catch (error) {
            timer.end('Get recent blogs failed');
            logger.error('Get recent blogs error:', error);
            res.status(500).json({
                error: 'Failed to fetch recent blogs',
                code: 'BLOG_FETCH_ERROR'
            });
        }
    }

    // Get blog categories
    async getBlogCategories(req, res) {
        const timer = logger.startTimer('Get blog categories');

        try {
            const categories = await cacheManager.wrap(
                'blogs:categories',
                () => dbManager.query(
                    'SELECT DISTINCT category, COUNT(*) as count FROM blogs WHERE published = 1 GROUP BY category ORDER BY count DESC'
                ),
                600 // 10 minutes cache
            );

            timer.end(`Retrieved ${categories.length} categories`);

            res.json({
                success: true,
                data: categories
            });

        } catch (error) {
            timer.end('Get blog categories failed');
            logger.error('Get blog categories error:', error);
            res.status(500).json({
                error: 'Failed to fetch blog categories',
                code: 'CATEGORY_FETCH_ERROR'
            });
        }
    }

    // Get all blogs for admin (protected)
    async getAllBlogsAdmin(req, res) {
        const timer = logger.startTimer('Get all blogs admin');

        try {
            const { limit = 50, offset = 0, status } = req.query;

            let query = 'SELECT * FROM blogs';
            let params = [];

            if (status) {
                query += ' WHERE published = ?';
                params.push(status === 'published' ? 1 : 0);
            }

            query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
            params.push(parseInt(limit), parseInt(offset));

            const blogs = await dbManager.query(query, params);

            timer.end(`Retrieved ${blogs.length} blogs for admin`);

            res.json({
                success: true,
                data: blogs,
                pagination: {
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                    count: blogs.length
                }
            });

        } catch (error) {
            timer.end('Get all blogs admin failed');
            logger.error('Get all blogs admin error:', error);
            res.status(500).json({
                error: 'Failed to fetch blogs',
                code: 'BLOG_FETCH_ERROR'
            });
        }
    }

    // Create blog (protected)
    async createBlog(req, res) {
        const timer = logger.startTimer('Create blog');

        try {
            const {
                title,
                content,
                excerpt,
                author,
                category = 'Legal',
                meta_description,
                keywords,
                published = 1,
                featured = 0,
                slug
            } = req.body;

            const date = new Date().toISOString().split('T')[0];
            const readTime = `${Math.ceil(content.length / 1000)} min read`;

            // Generate slug if not provided
            const finalSlug = slug || this.generateSlug(title);

            const result = await dbManager.query(
                `INSERT INTO blogs (title, content, excerpt, date, author, read_time, category, meta_description, keywords, published, featured, slug)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [title, content, excerpt, date, author, readTime, category, meta_description, keywords, published, featured, finalSlug]
            );

            const newBlog = await dbManager.queryOne(
                'SELECT * FROM blogs WHERE id = ?',
                [result.insertId]
            );

            // Invalidate blog-related cache
            cacheManager.invalidateBlogs();

            timer.end('Blog created successfully');

            res.status(201).json({
                success: true,
                message: 'Blog created successfully',
                data: newBlog
            });

        } catch (error) {
            timer.end('Create blog failed');
            logger.error('Create blog error:', error);
            res.status(500).json({
                error: 'Failed to create blog',
                code: 'BLOG_CREATE_ERROR'
            });
        }
    }

    // Update blog (protected)
    async updateBlog(req, res) {
        const timer = logger.startTimer('Update blog');

        try {
            const { id } = req.params;
            const {
                title,
                content,
                excerpt,
                author,
                category,
                meta_description,
                keywords,
                published,
                featured,
                slug
            } = req.body;

            const readTime = `${Math.ceil(content.length / 1000)} min read`;

            const result = await dbManager.query(
                `UPDATE blogs 
         SET title = ?, content = ?, excerpt = ?, author = ?, read_time = ?, category = ?, 
             meta_description = ?, keywords = ?, published = ?, featured = ?, slug = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
                [title, content, excerpt, author, readTime, category, meta_description, keywords, published, featured, slug, id]
            );

            if (result.affectedRows === 0) {
                timer.end('Blog not found for update');
                return res.status(404).json({
                    error: 'Blog not found',
                    code: 'BLOG_NOT_FOUND'
                });
            }

            const updatedBlog = await dbManager.queryOne(
                'SELECT * FROM blogs WHERE id = ?',
                [id]
            );

            // Invalidate blog-related cache
            cacheManager.invalidateBlogs();
            cacheManager.delete(cacheManager.patterns.blog.byId(id));

            timer.end('Blog updated successfully');

            res.json({
                success: true,
                message: 'Blog updated successfully',
                data: updatedBlog
            });

        } catch (error) {
            timer.end('Update blog failed');
            logger.error('Update blog error:', error);
            res.status(500).json({
                error: 'Failed to update blog',
                code: 'BLOG_UPDATE_ERROR'
            });
        }
    }

    // Delete blog (protected)
    async deleteBlog(req, res) {
        const timer = logger.startTimer('Delete blog');

        try {
            const { id } = req.params;

            const result = await dbManager.query(
                'DELETE FROM blogs WHERE id = ?',
                [id]
            );

            if (result.affectedRows === 0) {
                timer.end('Blog not found for deletion');
                return res.status(404).json({
                    error: 'Blog not found',
                    code: 'BLOG_NOT_FOUND'
                });
            }

            // Invalidate blog-related cache
            cacheManager.invalidateBlogs();
            cacheManager.delete(cacheManager.patterns.blog.byId(id));

            timer.end('Blog deleted successfully');

            res.json({
                success: true,
                message: 'Blog deleted successfully'
            });

        } catch (error) {
            timer.end('Delete blog failed');
            logger.error('Delete blog error:', error);
            res.status(500).json({
                error: 'Failed to delete blog',
                code: 'BLOG_DELETE_ERROR'
            });
        }
    }

    // Search blogs
    async searchBlogs(req, res) {
        const timer = logger.startTimer('Search blogs');

        try {
            const { q, category, limit = 20, offset = 0 } = req.query;

            if (!q) {
                return res.status(400).json({
                    error: 'Search query is required',
                    code: 'SEARCH_QUERY_REQUIRED'
                });
            }

            const cacheKey = cacheManager.generateKey('blogs:search', q, category, limit, offset);

            const blogs = await cacheManager.wrap(cacheKey, async () => {
                let query = 'SELECT * FROM blogs WHERE published = 1 AND (title LIKE ? OR content LIKE ? OR excerpt LIKE ?)';
                let params = [`%${q}%`, `%${q}%`, `%${q}%`];

                if (category && category !== 'All') {
                    query += ' AND category = ?';
                    params.push(category);
                }

                query += ' ORDER BY date DESC LIMIT ? OFFSET ?';
                params.push(parseInt(limit), parseInt(offset));

                return await dbManager.query(query, params);
            }, 300); // 5 minutes cache

            timer.end(`Search completed, found ${blogs.length} results`);

            res.json({
                success: true,
                data: blogs,
                search: {
                    query: q,
                    category: category || 'All',
                    results: blogs.length
                },
                pagination: {
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                    count: blogs.length
                }
            });

        } catch (error) {
            timer.end('Search blogs failed');
            logger.error('Search blogs error:', error);
            res.status(500).json({
                error: 'Failed to search blogs',
                code: 'BLOG_SEARCH_ERROR'
            });
        }
    }

    // Generate slug from title
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    }

    // Get blog statistics
    async getBlogStats(req, res) {
        const timer = logger.startTimer('Get blog stats');

        try {
            const stats = await cacheManager.wrap('blogs:stats', async () => {
                const [
                    totalBlogs,
                    publishedBlogs,
                    featuredBlogs,
                    totalViews,
                    recentBlogs
                ] = await dbManager.batchQuery([
                    { sql: 'SELECT COUNT(*) as count FROM blogs' },
                    { sql: 'SELECT COUNT(*) as count FROM blogs WHERE published = 1' },
                    { sql: 'SELECT COUNT(*) as count FROM blogs WHERE featured = 1 AND published = 1' },
                    { sql: 'SELECT SUM(views) as total FROM blogs WHERE published = 1' },
                    { sql: 'SELECT COUNT(*) as count FROM blogs WHERE published = 1 AND created_at > DATE_SUB(NOW(), INTERVAL 30 DAY)' }
                ]);

                return {
                    total: totalBlogs[0].count,
                    published: publishedBlogs[0].count,
                    featured: featuredBlogs[0].count,
                    totalViews: totalViews[0].total || 0,
                    recent: recentBlogs[0].count
                };
            }, 600); // 10 minutes cache

            timer.end('Blog stats retrieved');

            res.json({
                success: true,
                data: stats
            });

        } catch (error) {
            timer.end('Get blog stats failed');
            logger.error('Get blog stats error:', error);
            res.status(500).json({
                error: 'Failed to get blog statistics',
                code: 'BLOG_STATS_ERROR'
            });
        }
    }
}

module.exports = new BlogController(); 