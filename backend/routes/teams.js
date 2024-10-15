const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

module.exports = (db) => {

    const authenticateToken = (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from 'Bearer <token>'
        if (!token) return res.sendStatus(403); // Forbidden if no token
    
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403); // Forbidden if token is invalid
            req.user = user;  // Add user info to request
            next(); // Proceed if token is valid
        });
    };
    


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


    router.get('/employees', authenticateToken, (req, res) => {
        const query = 'SELECT id, first_name, last_name, availability FROM users'; // Fetch all users, not filtered by company for now
        db.query(query, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(results); 
        });
    });



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













