const dbManager = require('../config/database');
const logger = require('../utils/logger');
const cacheManager = require('../utils/cache');

class ContentController {
    // Get about content (public) with caching
    async getAboutContent(req, res) {
        const timer = logger.startTimer('Get about content');

        try {
            const content = await cacheManager.wrap(
                cacheManager.patterns.content.about,
                () => dbManager.queryOne('SELECT * FROM about_content ORDER BY id DESC LIMIT 1'),
                600 // 10 minutes cache
            );

            timer.end('About content retrieved');

            res.json({
                success: true,
                data: content || {}
            });

        } catch (error) {
            timer.end('Get about content failed');
            logger.error('Get about content error:', error);
            res.status(500).json({
                error: 'Failed to fetch about content',
                code: 'CONTENT_FETCH_ERROR'
            });
        }
    }

    // Get contact settings (public) with caching
    async getContactSettings(req, res) {
        const timer = logger.startTimer('Get contact settings');

        try {
            const settings = await cacheManager.wrap(
                cacheManager.patterns.content.contact,
                () => dbManager.queryOne('SELECT * FROM contact_settings ORDER BY id DESC LIMIT 1'),
                600 // 10 minutes cache
            );

            timer.end('Contact settings retrieved');

            res.json({
                success: true,
                data: settings || {}
            });

        } catch (error) {
            timer.end('Get contact settings failed');
            logger.error('Get contact settings error:', error);
            res.status(500).json({
                error: 'Failed to fetch contact settings',
                code: 'CONTENT_FETCH_ERROR'
            });
        }
    }

    // Update about content (protected)
    async updateAboutContent(req, res) {
        const timer = logger.startTimer('Update about content');

        try {
            const {
                intro,
                who_we_are,
                vision,
                mission,
                company_values,
                impact_stats
            } = req.body;

            // Check if content exists
            const existingContent = await dbManager.queryOne('SELECT id FROM about_content ORDER BY id DESC LIMIT 1');

            let result;
            if (existingContent) {
                // Update existing content
                result = await dbManager.query(
                    `UPDATE about_content 
           SET intro = ?, who_we_are = ?, vision = ?, mission = ?, company_values = ?, impact_stats = ?, updated_at = CURRENT_TIMESTAMP
           WHERE id = ?`,
                    [intro, who_we_are, vision, mission, company_values, impact_stats, existingContent.id]
                );
            } else {
                // Create new content
                result = await dbManager.query(
                    `INSERT INTO about_content (intro, who_we_are, vision, mission, company_values, impact_stats)
           VALUES (?, ?, ?, ?, ?, ?)`,
                    [intro, who_we_are, vision, mission, company_values, impact_stats]
                );
            }

            const updatedContent = await dbManager.queryOne('SELECT * FROM about_content ORDER BY id DESC LIMIT 1');

            // Invalidate content cache
            cacheManager.invalidateContent();

            timer.end('About content updated successfully');

            res.json({
                success: true,
                message: 'About content updated successfully',
                data: updatedContent
            });

        } catch (error) {
            timer.end('Update about content failed');
            logger.error('Update about content error:', error);
            res.status(500).json({
                error: 'Failed to update about content',
                code: 'CONTENT_UPDATE_ERROR'
            });
        }
    }

    // Update contact settings (protected)
    async updateContactSettings(req, res) {
        const timer = logger.startTimer('Update contact settings');

        try {
            const {
                email,
                phone,
                whatsapp,
                address,
                map_embed,
                office_hours
            } = req.body;

            // Check if settings exist
            const existingSettings = await dbManager.queryOne('SELECT id FROM contact_settings ORDER BY id DESC LIMIT 1');

            let result;
            if (existingSettings) {
                // Update existing settings
                result = await dbManager.query(
                    `UPDATE contact_settings 
           SET email = ?, phone = ?, whatsapp = ?, address = ?, map_embed = ?, office_hours = ?, updated_at = CURRENT_TIMESTAMP
           WHERE id = ?`,
                    [email, phone, whatsapp, address, map_embed, office_hours, existingSettings.id]
                );
            } else {
                // Create new settings
                result = await dbManager.query(
                    `INSERT INTO contact_settings (email, phone, whatsapp, address, map_embed, office_hours)
           VALUES (?, ?, ?, ?, ?, ?)`,
                    [email, phone, whatsapp, address, map_embed, office_hours]
                );
            }

            const updatedSettings = await dbManager.queryOne('SELECT * FROM contact_settings ORDER BY id DESC LIMIT 1');

            // Invalidate content cache
            cacheManager.invalidateContent();

            timer.end('Contact settings updated successfully');

            res.json({
                success: true,
                message: 'Contact settings updated successfully',
                data: updatedSettings
            });

        } catch (error) {
            timer.end('Update contact settings failed');
            logger.error('Update contact settings error:', error);
            res.status(500).json({
                error: 'Failed to update contact settings',
                code: 'CONTENT_UPDATE_ERROR'
            });
        }
    }

    // Get all content for admin (protected)
    async getAllContent(req, res) {
        const timer = logger.startTimer('Get all content admin');

        try {
            const [aboutContent, contactSettings] = await dbManager.batchQuery([
                { sql: 'SELECT * FROM about_content ORDER BY id DESC LIMIT 1' },
                { sql: 'SELECT * FROM contact_settings ORDER BY id DESC LIMIT 1' }
            ]);

            timer.end('All content retrieved for admin');

            res.json({
                success: true,
                data: {
                    about: aboutContent[0] || {},
                    contact: contactSettings[0] || {}
                }
            });

        } catch (error) {
            timer.end('Get all content admin failed');
            logger.error('Get all content admin error:', error);
            res.status(500).json({
                error: 'Failed to fetch content',
                code: 'CONTENT_FETCH_ERROR'
            });
        }
    }

    // Get content statistics
    async getContentStats(req, res) {
        const timer = logger.startTimer('Get content stats');

        try {
            const stats = await cacheManager.wrap('content:stats', async () => {
                const [
                    aboutCount,
                    contactCount
                ] = await dbManager.batchQuery([
                    { sql: 'SELECT COUNT(*) as count FROM about_content' },
                    { sql: 'SELECT COUNT(*) as count FROM contact_settings' }
                ]);

                return {
                    about: aboutCount[0].count,
                    contact: contactCount[0].count
                };
            }, 600); // 10 minutes cache

            timer.end('Content stats retrieved');

            res.json({
                success: true,
                data: stats
            });

        } catch (error) {
            timer.end('Get content stats failed');
            logger.error('Get content stats error:', error);
            res.status(500).json({
                error: 'Failed to get content statistics',
                code: 'CONTENT_STATS_ERROR'
            });
        }
    }
}

module.exports = new ContentController(); 