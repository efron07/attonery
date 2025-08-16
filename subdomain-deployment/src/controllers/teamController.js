const dbManager = require('../config/database');
const logger = require('../utils/logger');
const cacheManager = require('../utils/cache');

class TeamController {
    // Get all active team members (public) with caching
    async getAllTeamMembers(req, res) {
        const timer = logger.startTimer('Get all team members');

        try {
            const { limit = 50, offset = 0 } = req.query;

            const teamMembers = await cacheManager.wrap(
                cacheManager.patterns.team.active,
                () => dbManager.query(
                    'SELECT * FROM team_members WHERE active = 1 ORDER BY order_index ASC, name ASC LIMIT ? OFFSET ?',
                    [parseInt(limit), parseInt(offset)]
                ),
                300 // 5 minutes cache
            );

            timer.end(`Retrieved ${teamMembers.length} team members`);

            res.json({
                success: true,
                data: teamMembers,
                pagination: {
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                    count: teamMembers.length
                }
            });

        } catch (error) {
            timer.end('Get all team members failed');
            logger.error('Get all team members error:', error);
            res.status(500).json({
                error: 'Failed to fetch team members',
                code: 'TEAM_FETCH_ERROR'
            });
        }
    }

    // Get single team member (public) with caching
    async getTeamMemberById(req, res) {
        const timer = logger.startTimer('Get team member by ID');

        try {
            const { id } = req.params;

            const teamMember = await cacheManager.wrap(
                cacheManager.patterns.team.byId(id),
                () => dbManager.queryOne(
                    'SELECT * FROM team_members WHERE id = ? AND active = 1',
                    [id]
                ),
                600 // 10 minutes cache
            );

            if (!teamMember) {
                timer.end('Team member not found');
                return res.status(404).json({
                    error: 'Team member not found',
                    code: 'TEAM_MEMBER_NOT_FOUND'
                });
            }

            timer.end('Team member retrieved successfully');

            res.json({
                success: true,
                data: teamMember
            });

        } catch (error) {
            timer.end('Get team member by ID failed');
            logger.error('Get team member by ID error:', error);
            res.status(500).json({
                error: 'Failed to fetch team member',
                code: 'TEAM_FETCH_ERROR'
            });
        }
    }

    // Get all team members for admin (protected)
    async getAllTeamMembersAdmin(req, res) {
        const timer = logger.startTimer('Get all team members admin');

        try {
            const { limit = 50, offset = 0, status } = req.query;

            let query = 'SELECT * FROM team_members';
            let params = [];

            if (status) {
                query += ' WHERE active = ?';
                params.push(status === 'active' ? 1 : 0);
            }

            query += ' ORDER BY order_index ASC, name ASC LIMIT ? OFFSET ?';
            params.push(parseInt(limit), parseInt(offset));

            const teamMembers = await dbManager.query(query, params);

            timer.end(`Retrieved ${teamMembers.length} team members for admin`);

            res.json({
                success: true,
                data: teamMembers,
                pagination: {
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                    count: teamMembers.length
                }
            });

        } catch (error) {
            timer.end('Get all team members admin failed');
            logger.error('Get all team members admin error:', error);
            res.status(500).json({
                error: 'Failed to fetch team members',
                code: 'TEAM_FETCH_ERROR'
            });
        }
    }

    // Create team member (protected)
    async createTeamMember(req, res) {
        const timer = logger.startTimer('Create team member');

        try {
            const {
                name,
                title,
                bio,
                image,
                specialties,
                experience,
                order_index = 0,
                active = 1,
                email,
                linkedin
            } = req.body;

            const result = await dbManager.query(
                `INSERT INTO team_members (name, title, bio, image, specialties, experience, order_index, active, email, linkedin)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [name, title, bio, image, specialties, experience, order_index, active, email, linkedin]
            );

            const newTeamMember = await dbManager.queryOne(
                'SELECT * FROM team_members WHERE id = ?',
                [result.insertId]
            );

            // Invalidate team-related cache
            cacheManager.invalidateTeam();

            timer.end('Team member created successfully');

            res.status(201).json({
                success: true,
                message: 'Team member created successfully',
                data: newTeamMember
            });

        } catch (error) {
            timer.end('Create team member failed');
            logger.error('Create team member error:', error);
            res.status(500).json({
                error: 'Failed to create team member',
                code: 'TEAM_CREATE_ERROR'
            });
        }
    }

    // Update team member (protected)
    async updateTeamMember(req, res) {
        const timer = logger.startTimer('Update team member');

        try {
            const { id } = req.params;
            const {
                name,
                title,
                bio,
                image,
                specialties,
                experience,
                order_index,
                active,
                email,
                linkedin
            } = req.body;

            const result = await dbManager.query(
                `UPDATE team_members 
         SET name = ?, title = ?, bio = ?, image = ?, specialties = ?, experience = ?, 
             order_index = ?, active = ?, email = ?, linkedin = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
                [name, title, bio, image, specialties, experience, order_index, active, email, linkedin, id]
            );

            if (result.affectedRows === 0) {
                timer.end('Team member not found for update');
                return res.status(404).json({
                    error: 'Team member not found',
                    code: 'TEAM_MEMBER_NOT_FOUND'
                });
            }

            const updatedTeamMember = await dbManager.queryOne(
                'SELECT * FROM team_members WHERE id = ?',
                [id]
            );

            // Invalidate team-related cache
            cacheManager.invalidateTeam();
            cacheManager.delete(cacheManager.patterns.team.byId(id));

            timer.end('Team member updated successfully');

            res.json({
                success: true,
                message: 'Team member updated successfully',
                data: updatedTeamMember
            });

        } catch (error) {
            timer.end('Update team member failed');
            logger.error('Update team member error:', error);
            res.status(500).json({
                error: 'Failed to update team member',
                code: 'TEAM_UPDATE_ERROR'
            });
        }
    }

    // Delete team member (protected)
    async deleteTeamMember(req, res) {
        const timer = logger.startTimer('Delete team member');

        try {
            const { id } = req.params;

            const result = await dbManager.query(
                'DELETE FROM team_members WHERE id = ?',
                [id]
            );

            if (result.affectedRows === 0) {
                timer.end('Team member not found for deletion');
                return res.status(404).json({
                    error: 'Team member not found',
                    code: 'TEAM_MEMBER_NOT_FOUND'
                });
            }

            // Invalidate team-related cache
            cacheManager.invalidateTeam();
            cacheManager.delete(cacheManager.patterns.team.byId(id));

            timer.end('Team member deleted successfully');

            res.json({
                success: true,
                message: 'Team member deleted successfully'
            });

        } catch (error) {
            timer.end('Delete team member failed');
            logger.error('Delete team member error:', error);
            res.status(500).json({
                error: 'Failed to delete team member',
                code: 'TEAM_DELETE_ERROR'
            });
        }
    }

    // Search team members
    async searchTeamMembers(req, res) {
        const timer = logger.startTimer('Search team members');

        try {
            const { q, limit = 20, offset = 0 } = req.query;

            if (!q) {
                return res.status(400).json({
                    error: 'Search query is required',
                    code: 'SEARCH_QUERY_REQUIRED'
                });
            }

            const cacheKey = cacheManager.generateKey('team:search', q, limit, offset);

            const teamMembers = await cacheManager.wrap(cacheKey, async () => {
                const query = 'SELECT * FROM team_members WHERE active = 1 AND (name LIKE ? OR title LIKE ? OR bio LIKE ? OR specialties LIKE ?) ORDER BY order_index ASC, name ASC LIMIT ? OFFSET ?';
                const params = [`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`, parseInt(limit), parseInt(offset)];

                return await dbManager.query(query, params);
            }, 300); // 5 minutes cache

            timer.end(`Search completed, found ${teamMembers.length} results`);

            res.json({
                success: true,
                data: teamMembers,
                search: {
                    query: q,
                    results: teamMembers.length
                },
                pagination: {
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                    count: teamMembers.length
                }
            });

        } catch (error) {
            timer.end('Search team members failed');
            logger.error('Search team members error:', error);
            res.status(500).json({
                error: 'Failed to search team members',
                code: 'TEAM_SEARCH_ERROR'
            });
        }
    }

    // Update team member order (protected)
    async updateTeamMemberOrder(req, res) {
        const timer = logger.startTimer('Update team member order');

        try {
            const { teamMembers } = req.body; // Array of { id, order_index }

            if (!Array.isArray(teamMembers)) {
                return res.status(400).json({
                    error: 'Team members array is required',
                    code: 'INVALID_INPUT'
                });
            }

            // Update each team member order
            for (const member of teamMembers) {
                await dbManager.query(
                    'UPDATE team_members SET order_index = ? WHERE id = ?',
                    [member.order_index, member.id]
                );
            }

            // Invalidate team-related cache
            cacheManager.invalidateTeam();

            timer.end(`Updated order for ${teamMembers.length} team members`);

            res.json({
                success: true,
                message: 'Team member order updated successfully'
            });

        } catch (error) {
            timer.end('Update team member order failed');
            logger.error('Update team member order error:', error);
            res.status(500).json({
                error: 'Failed to update team member order',
                code: 'TEAM_ORDER_UPDATE_ERROR'
            });
        }
    }

    // Get team member statistics
    async getTeamMemberStats(req, res) {
        const timer = logger.startTimer('Get team member stats');

        try {
            const stats = await cacheManager.wrap('team:stats', async () => {
                const [
                    totalMembers,
                    activeMembers,
                    inactiveMembers
                ] = await dbManager.batchQuery([
                    { sql: 'SELECT COUNT(*) as count FROM team_members' },
                    { sql: 'SELECT COUNT(*) as count FROM team_members WHERE active = 1' },
                    { sql: 'SELECT COUNT(*) as count FROM team_members WHERE active = 0' }
                ]);

                return {
                    total: totalMembers[0].count,
                    active: activeMembers[0].count,
                    inactive: inactiveMembers[0].count
                };
            }, 600); // 10 minutes cache

            timer.end('Team member stats retrieved');

            res.json({
                success: true,
                data: stats
            });

        } catch (error) {
            timer.end('Get team member stats failed');
            logger.error('Get team member stats error:', error);
            res.status(500).json({
                error: 'Failed to get team member statistics',
                code: 'TEAM_STATS_ERROR'
            });
        }
    }
}

module.exports = new TeamController(); 