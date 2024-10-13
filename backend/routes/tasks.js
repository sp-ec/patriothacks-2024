const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

module.exports = (db) => {

    const authenticateToken = (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) return res.sendStatus(403);

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;  
        });
    };

    router.post('/create', authenticateToken, (req, res) => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const { taskName, description, assigned_user_id } = req.body;

        const query = 'INSERT INTO tasks (taskName, description, assigned_user_id) VALUES (?, ?, ?)';
        db.query(query, [taskName, description, assigned_user_id], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ message: 'Task created successfully!' });
        });
    });

    router.get('/my-tasks', authenticateToken, (req, res) => {
        const query = 'SELECT * FROM tasks WHERE assigned_user_id = ?';
        db.query(query, [req.user.userId], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(results);
        });
    });

    router.put('/tasks/:taskId/status', authenticateToken, (req, res) => {
        const { taskId } = req.params;
        const { status } = req.body;

        const query = 'UPDATE tasks SET status = ? WHERE id = ? AND assigned_user_id = ?';
        db.query(query, [status, taskId, req.user.userId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (result.affectedRows === 0) {
                return res.status(403).json({ error: 'Unauthorized or task not found' });
            }

            res.json({ message: 'Task status updated successfully' });
        });
    });

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

    router.get('/tasks', authenticateToken, (req, res) => {
        if (req.user.role !== 'event_manager' && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const query = 'SELECT id, taskName AS name, description, assigned_user_id AS assigned_employee FROM tasks WHERE company = ?';
        db.query(query, [req.user.company], (err, results) => {
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

        // employees company == event manager
        const checkUserQuery = 'SELECT * FROM users WHERE id = ? AND company = ?';
        db.query(checkUserQuery, [employeeId, req.user.company], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (results.length === 0) {
                return res.status(400).json({ error: 'Employee does not belong to your company' });
            }

            // Insert task 
            const query = 'INSERT INTO tasks (taskName, description, assigned_user_id, company) VALUES (?, ?, ?, ?)';
            db.query(query, [taskName, taskDescription, employeeId, req.user.company], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }
                res.json({ message: 'Task assigned successfully!' });
            });
        });
    });

    return router;
};
