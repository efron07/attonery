const dbManager = require('../config/database');
const logger = require('../utils/logger');
const cacheManager = require('../utils/cache');

class ServiceController {
    // Get all active services (public) with caching
    async getAllServices(req, res) {
        const timer = logger.startTimer('Get all services');

        try {
            const { limit = 50, offset = 0 } = req.query;

            const services = await cacheManager.wrap(
                cacheManager.patterns.service.active,
                () => dbManager.query(
                    'SELECT * FROM services WHERE active = 1 ORDER BY order_index ASC, title ASC LIMIT ? OFFSET ?',
                    [parseInt(limit), parseInt(offset)]
                ),
                300 // 5 minutes cache
            );

            timer.end(`Retrieved ${services.length} services`);

            res.json({
                success: true,
                data: services,
                pagination: {
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                    count: services.length
                }
            });

        } catch (error) {
            timer.end('Get all services failed');
            logger.error('Get all services error:', error);
            res.status(500).json({
                error: 'Failed to fetch services',
                code: 'SERVICE_FETCH_ERROR'
            });
        }
    }

    // Get single service (public) with caching
    async getServiceById(req, res) {
        const timer = logger.startTimer('Get service by ID');

        try {
            const { id } = req.params;

            const service = await cacheManager.wrap(
                cacheManager.patterns.service.byId(id),
                () => dbManager.queryOne(
                    'SELECT * FROM services WHERE id = ? AND active = 1',
                    [id]
                ),
                600 // 10 minutes cache
            );

            if (!service) {
                timer.end('Service not found');
                return res.status(404).json({
                    error: 'Service not found',
                    code: 'SERVICE_NOT_FOUND'
                });
            }

            timer.end('Service retrieved successfully');

            res.json({
                success: true,
                data: service
            });

        } catch (error) {
            timer.end('Get service by ID failed');
            logger.error('Get service by ID error:', error);
            res.status(500).json({
                error: 'Failed to fetch service',
                code: 'SERVICE_FETCH_ERROR'
            });
        }
    }

    // Get service by slug (public) with caching
    async getServiceBySlug(req, res) {
        const timer = logger.startTimer('Get service by slug');

        try {
            const { slug } = req.params;

            const service = await cacheManager.wrap(
                cacheManager.patterns.service.bySlug(slug),
                () => dbManager.queryOne(
                    'SELECT * FROM services WHERE slug = ? AND active = 1',
                    [slug]
                ),
                600 // 10 minutes cache
            );

            if (!service) {
                timer.end('Service not found');
                return res.status(404).json({
                    error: 'Service not found',
                    code: 'SERVICE_NOT_FOUND'
                });
            }

            timer.end('Service retrieved successfully');

            res.json({
                success: true,
                data: service
            });

        } catch (error) {
            timer.end('Get service by slug failed');
            logger.error('Get service by slug error:', error);
            res.status(500).json({
                error: 'Failed to fetch service',
                code: 'SERVICE_FETCH_ERROR'
            });
        }
    }

    // Get all services for admin (protected)
    async getAllServicesAdmin(req, res) {
        const timer = logger.startTimer('Get all services admin');

        try {
            const { limit = 50, offset = 0, status } = req.query;

            let query = 'SELECT * FROM services';
            let params = [];

            if (status) {
                query += ' WHERE active = ?';
                params.push(status === 'active' ? 1 : 0);
            }

            query += ' ORDER BY order_index ASC, title ASC LIMIT ? OFFSET ?';
            params.push(parseInt(limit), parseInt(offset));

            const services = await dbManager.query(query, params);

            timer.end(`Retrieved ${services.length} services for admin`);

            res.json({
                success: true,
                data: services,
                pagination: {
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                    count: services.length
                }
            });

        } catch (error) {
            timer.end('Get all services admin failed');
            logger.error('Get all services admin error:', error);
            res.status(500).json({
                error: 'Failed to fetch services',
                code: 'SERVICE_FETCH_ERROR'
            });
        }
    }

    // Create service (protected)
    async createService(req, res) {
        const timer = logger.startTimer('Create service');

        try {
            const {
                title,
                description,
                icon,
                link,
                gradient,
                order_index = 0,
                active = 1,
                overview,
                features,
                process_steps,
                requirements,
                benefits,
                meta_description,
                keywords,
                slug
            } = req.body;

            // Generate slug if not provided
            const finalSlug = slug || this.generateSlug(title);

            const result = await dbManager.query(
                `INSERT INTO services (title, description, icon, link, gradient, order_index, active, overview, features, process_steps, requirements, benefits, meta_description, keywords, slug)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [title, description, icon, link, gradient, order_index, active, overview, features, process_steps, requirements, benefits, meta_description, keywords, finalSlug]
            );

            const newService = await dbManager.queryOne(
                'SELECT * FROM services WHERE id = ?',
                [result.insertId]
            );

            // Invalidate service-related cache
            cacheManager.invalidateServices();

            timer.end('Service created successfully');

            res.status(201).json({
                success: true,
                message: 'Service created successfully',
                data: newService
            });

        } catch (error) {
            timer.end('Create service failed');
            logger.error('Create service error:', error);
            res.status(500).json({
                error: 'Failed to create service',
                code: 'SERVICE_CREATE_ERROR'
            });
        }
    }

    // Update service (protected)
    async updateService(req, res) {
        const timer = logger.startTimer('Update service');

        try {
            const { id } = req.params;
            const {
                title,
                description,
                icon,
                link,
                gradient,
                order_index,
                active,
                overview,
                features,
                process_steps,
                requirements,
                benefits,
                meta_description,
                keywords,
                slug
            } = req.body;

            const result = await dbManager.query(
                `UPDATE services 
         SET title = ?, description = ?, icon = ?, link = ?, gradient = ?, order_index = ?, active = ?, 
             overview = ?, features = ?, process_steps = ?, requirements = ?, benefits = ?, 
             meta_description = ?, keywords = ?, slug = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
                [title, description, icon, link, gradient, order_index, active, overview, features, process_steps, requirements, benefits, meta_description, keywords, slug, id]
            );

            if (result.affectedRows === 0) {
                timer.end('Service not found for update');
                return res.status(404).json({
                    error: 'Service not found',
                    code: 'SERVICE_NOT_FOUND'
                });
            }

            const updatedService = await dbManager.queryOne(
                'SELECT * FROM services WHERE id = ?',
                [id]
            );

            // Invalidate service-related cache
            cacheManager.invalidateServices();
            cacheManager.delete(cacheManager.patterns.service.byId(id));
            if (updatedService.slug) {
                cacheManager.delete(cacheManager.patterns.service.bySlug(updatedService.slug));
            }

            timer.end('Service updated successfully');

            res.json({
                success: true,
                message: 'Service updated successfully',
                data: updatedService
            });

        } catch (error) {
            timer.end('Update service failed');
            logger.error('Update service error:', error);
            res.status(500).json({
                error: 'Failed to update service',
                code: 'SERVICE_UPDATE_ERROR'
            });
        }
    }

    // Delete service (protected)
    async deleteService(req, res) {
        const timer = logger.startTimer('Delete service');

        try {
            const { id } = req.params;

            // Get service before deletion for cache invalidation
            const service = await dbManager.queryOne(
                'SELECT slug FROM services WHERE id = ?',
                [id]
            );

            const result = await dbManager.query(
                'DELETE FROM services WHERE id = ?',
                [id]
            );

            if (result.affectedRows === 0) {
                timer.end('Service not found for deletion');
                return res.status(404).json({
                    error: 'Service not found',
                    code: 'SERVICE_NOT_FOUND'
                });
            }

            // Invalidate service-related cache
            cacheManager.invalidateServices();
            cacheManager.delete(cacheManager.patterns.service.byId(id));
            if (service && service.slug) {
                cacheManager.delete(cacheManager.patterns.service.bySlug(service.slug));
            }

            timer.end('Service deleted successfully');

            res.json({
                success: true,
                message: 'Service deleted successfully'
            });

        } catch (error) {
            timer.end('Delete service failed');
            logger.error('Delete service error:', error);
            res.status(500).json({
                error: 'Failed to delete service',
                code: 'SERVICE_DELETE_ERROR'
            });
        }
    }

    // Search services
    async searchServices(req, res) {
        const timer = logger.startTimer('Search services');

        try {
            const { q, limit = 20, offset = 0 } = req.query;

            if (!q) {
                return res.status(400).json({
                    error: 'Search query is required',
                    code: 'SEARCH_QUERY_REQUIRED'
                });
            }

            const cacheKey = cacheManager.generateKey('services:search', q, limit, offset);

            const services = await cacheManager.wrap(cacheKey, async () => {
                const query = 'SELECT * FROM services WHERE active = 1 AND (title LIKE ? OR description LIKE ? OR overview LIKE ?) ORDER BY order_index ASC, title ASC LIMIT ? OFFSET ?';
                const params = [`%${q}%`, `%${q}%`, `%${q}%`, parseInt(limit), parseInt(offset)];

                return await dbManager.query(query, params);
            }, 300); // 5 minutes cache

            timer.end(`Search completed, found ${services.length} results`);

            res.json({
                success: true,
                data: services,
                search: {
                    query: q,
                    results: services.length
                },
                pagination: {
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                    count: services.length
                }
            });

        } catch (error) {
            timer.end('Search services failed');
            logger.error('Search services error:', error);
            res.status(500).json({
                error: 'Failed to search services',
                code: 'SERVICE_SEARCH_ERROR'
            });
        }
    }

    // Update service order (protected)
    async updateServiceOrder(req, res) {
        const timer = logger.startTimer('Update service order');

        try {
            const { services } = req.body; // Array of { id, order_index }

            if (!Array.isArray(services)) {
                return res.status(400).json({
                    error: 'Services array is required',
                    code: 'INVALID_INPUT'
                });
            }

            // Update each service order
            for (const service of services) {
                await dbManager.query(
                    'UPDATE services SET order_index = ? WHERE id = ?',
                    [service.order_index, service.id]
                );
            }

            // Invalidate service-related cache
            cacheManager.invalidateServices();

            timer.end(`Updated order for ${services.length} services`);

            res.json({
                success: true,
                message: 'Service order updated successfully'
            });

        } catch (error) {
            timer.end('Update service order failed');
            logger.error('Update service order error:', error);
            res.status(500).json({
                error: 'Failed to update service order',
                code: 'SERVICE_ORDER_UPDATE_ERROR'
            });
        }
    }

    // Get service statistics
    async getServiceStats(req, res) {
        const timer = logger.startTimer('Get service stats');

        try {
            const stats = await cacheManager.wrap('services:stats', async () => {
                const [
                    totalServices,
                    activeServices,
                    inactiveServices
                ] = await dbManager.batchQuery([
                    { sql: 'SELECT COUNT(*) as count FROM services' },
                    { sql: 'SELECT COUNT(*) as count FROM services WHERE active = 1' },
                    { sql: 'SELECT COUNT(*) as count FROM services WHERE active = 0' }
                ]);

                return {
                    total: totalServices[0].count,
                    active: activeServices[0].count,
                    inactive: inactiveServices[0].count
                };
            }, 600); // 10 minutes cache

            timer.end('Service stats retrieved');

            res.json({
                success: true,
                data: stats
            });

        } catch (error) {
            timer.end('Get service stats failed');
            logger.error('Get service stats error:', error);
            res.status(500).json({
                error: 'Failed to get service statistics',
                code: 'SERVICE_STATS_ERROR'
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
}

module.exports = new ServiceController(); 