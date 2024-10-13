const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

module.exports = (db) => {

    // Middleware to check for authenticated users
    const authenticateToken = (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) return res.sendStatus(403);

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;  // Add user info to request
            next();
        });
    };

    // Route for creating a team
    router.post('/create-team', authenticateToken, (req, res) => {
        if (req.user.role !== 'event_manager' && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const { name } = req.body;

        const query = 'INSERT INTO teams (name, manager_id, company) VALUES (?, ?, ?)';
        db.query(query, [name, req.user.userId, req.user.company], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ message: 'Team created successfully!' });
        });
    });

    // Route for fetching teams for admin, filtered by company
    router.get('/admin/teams', authenticateToken, (req, res) => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const query = 'SELECT * FROM teams WHERE company = ?';
        db.query(query, [req.user.company], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(results);
        });
    });

    // Fetch tasks for a team (admin view)
    router.get('/admin/team-tasks/:teamId', authenticateToken, (req, res) => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const { teamId } = req.params;
        const query = 'SELECT * FROM tasks WHERE team_id = ?';
        db.query(query, [teamId], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(results);
        });
    });

    // Route for assigning employees to teams
    router.post('/assign-to-team', authenticateToken, (req, res) => {
        if (req.user.role !== 'event_manager' && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const { teamId, employeeId } = req.body;

        const query = 'UPDATE users SET team_id = ? WHERE id = ? AND company = ?';
        db.query(query, [teamId, employeeId, req.user.company], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (result.affectedRows === 0) {
                return res.status(400).json({ error: 'Employee does not belong to your company or is invalid' });
            }

            res.json({ message: 'Employee assigned to team successfully' });
        });
    });

    // Fetch employees for the event manager's company
    router.get('/employees', authenticateToken, (req, res) => {
        if (req.user.role !== 'event_manager' && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const query = 'SELECT id, first_name, last_name FROM users WHERE role = "employee" AND company = ?';
        db.query(query, [req.user.company], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(results);
        });
    });

    // assigning to employee: link to teams 
    router.post('/assign-task', authenticateToken, (req, res) => {
        if (req.user.role !== 'event_manager' && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const { employeeId, taskName, taskDescription } = req.body;

        const query = 'INSERT INTO tasks (taskName, description, assigned_user_id) VALUES (?, ?, ?)';
        db.query(query, [taskName, taskDescription, employeeId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ message: 'Task assigned successfully!' });
        });
    });

    return router;
};













