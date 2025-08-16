const dbManager = require('../config/database');
const logger = require('../utils/logger');
const cacheManager = require('../utils/cache');

class PublicController {
    // Submit contact inquiry (public)
    async submitInquiry(req, res) {
        const timer = logger.startTimer('Submit inquiry');

        try {
            const { name, phone, email, service, message } = req.body;

            const result = await dbManager.query(
                `INSERT INTO inquiries (name, phone, email, service, message)
         VALUES (?, ?, ?, ?, ?)`,
                [name, phone, email, service, message]
            );

            timer.end('Inquiry submitted successfully');

            res.status(201).json({
                success: true,
                message: 'Inquiry submitted successfully',
                data: {
                    id: result.insertId,
                    submittedAt: new Date().toISOString()
                }
            });

        } catch (error) {
            timer.end('Submit inquiry failed');
            logger.error('Submit inquiry error:', error);
            res.status(500).json({
                error: 'Failed to submit inquiry',
                code: 'INQUIRY_SUBMIT_ERROR'
            });
        }
    }

    // Subscribe to newsletter (public)
    async subscribeToNewsletter(req, res) {
        const timer = logger.startTimer('Subscribe to newsletter');

        try {
            const { email } = req.body;

            // Check if already subscribed
            const existingSubscriber = await dbManager.queryOne(
                'SELECT id FROM subscribers WHERE email = ?',
                [email]
            );

            if (existingSubscriber) {
                timer.end('Email already subscribed');
                return res.json({
                    success: true,
                    message: 'Email already subscribed to newsletter'
                });
            }

            const result = await dbManager.query(
                `INSERT INTO subscribers (email)
         VALUES (?)`,
                [email]
            );

            timer.end('Newsletter subscription successful');

            res.status(201).json({
                success: true,
                message: 'Successfully subscribed to newsletter',
                data: {
                    id: result.insertId,
                    subscribedAt: new Date().toISOString()
                }
            });

        } catch (error) {
            timer.end('Subscribe to newsletter failed');
            logger.error('Subscribe to newsletter error:', error);
            res.status(500).json({
                error: 'Failed to subscribe to newsletter',
                code: 'SUBSCRIPTION_ERROR'
            });
        }
    }

    // Get inquiries (protected)
    async getInquiries(req, res) {
        const timer = logger.startTimer('Get inquiries');

        try {
            const { status, limit = 50, offset = 0, priority } = req.query;

            let query = 'SELECT * FROM inquiries';
            let params = [];

            const conditions = [];
            if (status) {
                conditions.push('status = ?');
                params.push(status);
            }
            if (priority) {
                conditions.push('priority = ?');
                params.push(priority);
            }

            if (conditions.length > 0) {
                query += ' WHERE ' + conditions.join(' AND ');
            }

            query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
            params.push(parseInt(limit), parseInt(offset));

            const inquiries = await dbManager.query(query, params);

            timer.end(`Retrieved ${inquiries.length} inquiries`);

            res.json({
                success: true,
                data: inquiries,
                pagination: {
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                    count: inquiries.length
                }
            });

        } catch (error) {
            timer.end('Get inquiries failed');
            logger.error('Get inquiries error:', error);
            res.status(500).json({
                error: 'Failed to fetch inquiries',
                code: 'INQUIRY_FETCH_ERROR'
            });
        }
    }

    // Get subscribers (protected)
    async getSubscribers(req, res) {
        const timer = logger.startTimer('Get subscribers');

        try {
            const { active = 1, limit = 100, offset = 0 } = req.query;

            const subscribers = await dbManager.query(
                `SELECT * FROM subscribers 
         WHERE active = ? 
         ORDER BY subscribed_at DESC 
         LIMIT ? OFFSET ?`,
                [active, parseInt(limit), parseInt(offset)]
            );

            timer.end(`Retrieved ${subscribers.length} subscribers`);

            res.json({
                success: true,
                data: subscribers,
                pagination: {
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                    count: subscribers.length
                }
            });

        } catch (error) {
            timer.end('Get subscribers failed');
            logger.error('Get subscribers error:', error);
            res.status(500).json({
                error: 'Failed to fetch subscribers',
                code: 'SUBSCRIBER_FETCH_ERROR'
            });
        }
    }

    // Update inquiry status (protected)
    async updateInquiryStatus(req, res) {
        const timer = logger.startTimer('Update inquiry status');

        try {
            const { id } = req.params;
            const { status, priority, assigned_to } = req.body;

            const result = await dbManager.query(
                `UPDATE inquiries 
         SET status = ?, priority = ?, assigned_to = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
                [status, priority, assigned_to, id]
            );

            if (result.affectedRows === 0) {
                timer.end('Inquiry not found');
                return res.status(404).json({
                    error: 'Inquiry not found',
                    code: 'INQUIRY_NOT_FOUND'
                });
            }

            const updatedInquiry = await dbManager.queryOne(
                'SELECT * FROM inquiries WHERE id = ?',
                [id]
            );

            timer.end('Inquiry status updated successfully');

            res.json({
                success: true,
                message: 'Inquiry status updated successfully',
                data: updatedInquiry
            });

        } catch (error) {
            timer.end('Update inquiry status failed');
            logger.error('Update inquiry status error:', error);
            res.status(500).json({
                error: 'Failed to update inquiry status',
                code: 'INQUIRY_UPDATE_ERROR'
            });
        }
    }

    // Unsubscribe from newsletter (public)
    async unsubscribeFromNewsletter(req, res) {
        const timer = logger.startTimer('Unsubscribe from newsletter');

        try {
            const { email } = req.body;

            const result = await dbManager.query(
                `UPDATE subscribers 
         SET active = 0, unsubscribed_at = CURRENT_TIMESTAMP
         WHERE email = ?`,
                [email]
            );

            if (result.affectedRows === 0) {
                timer.end('Subscriber not found');
                return res.status(404).json({
                    error: 'Subscriber not found',
                    code: 'SUBSCRIBER_NOT_FOUND'
                });
            }

            timer.end('Unsubscribed successfully');

            res.json({
                success: true,
                message: 'Successfully unsubscribed from newsletter'
            });

        } catch (error) {
            timer.end('Unsubscribe failed');
            logger.error('Unsubscribe error:', error);
            res.status(500).json({
                error: 'Failed to unsubscribe',
                code: 'UNSUBSCRIBE_ERROR'
            });
        }
    }

    // Get inquiry statistics
    async getInquiryStats(req, res) {
        const timer = logger.startTimer('Get inquiry stats');

        try {
            const stats = await cacheManager.wrap('inquiries:stats', async () => {
                const [
                    totalInquiries,
                    newInquiries,
                    pendingInquiries,
                    completedInquiries,
                    recentInquiries
                ] = await dbManager.batchQuery([
                    { sql: 'SELECT COUNT(*) as count FROM inquiries' },
                    { sql: 'SELECT COUNT(*) as count FROM inquiries WHERE status = "new"' },
                    { sql: 'SELECT COUNT(*) as count FROM inquiries WHERE status = "pending"' },
                    { sql: 'SELECT COUNT(*) as count FROM inquiries WHERE status = "completed"' },
                    { sql: 'SELECT COUNT(*) as count FROM inquiries WHERE created_at > DATE_SUB(NOW(), INTERVAL 7 DAY)' }
                ]);

                return {
                    total: totalInquiries[0].count,
                    new: newInquiries[0].count,
                    pending: pendingInquiries[0].count,
                    completed: completedInquiries[0].count,
                    recent: recentInquiries[0].count
                };
            }, 300); // 5 minutes cache

            timer.end('Inquiry stats retrieved');

            res.json({
                success: true,
                data: stats
            });

        } catch (error) {
            timer.end('Get inquiry stats failed');
            logger.error('Get inquiry stats error:', error);
            res.status(500).json({
                error: 'Failed to get inquiry statistics',
                code: 'INQUIRY_STATS_ERROR'
            });
        }
    }

    // Get subscriber statistics
    async getSubscriberStats(req, res) {
        const timer = logger.startTimer('Get subscriber stats');

        try {
            const stats = await cacheManager.wrap('subscribers:stats', async () => {
                const [
                    totalSubscribers,
                    activeSubscribers,
                    recentSubscribers
                ] = await dbManager.batchQuery([
                    { sql: 'SELECT COUNT(*) as count FROM subscribers' },
                    { sql: 'SELECT COUNT(*) as count FROM subscribers WHERE active = 1' },
                    { sql: 'SELECT COUNT(*) as count FROM subscribers WHERE subscribed_at > DATE_SUB(NOW(), INTERVAL 30 DAY)' }
                ]);

                return {
                    total: totalSubscribers[0].count,
                    active: activeSubscribers[0].count,
                    recent: recentSubscribers[0].count
                };
            }, 600); // 10 minutes cache

            timer.end('Subscriber stats retrieved');

            res.json({
                success: true,
                data: stats
            });

        } catch (error) {
            timer.end('Get subscriber stats failed');
            logger.error('Get subscriber stats error:', error);
            res.status(500).json({
                error: 'Failed to get subscriber statistics',
                code: 'SUBSCRIBER_STATS_ERROR'
            });
        }
    }
}

module.exports = new PublicController(); 