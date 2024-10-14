const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

module.exports = (db) => {
    const authenticateToken = (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1]; // Ensure token is in correct format
        if (!token) return res.sendStatus(403);

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    };

    // Get all tasks for display

    router.get('/', authenticateToken, (req, res) => {
        if (req.user.role !== 'event_manager' && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const query = `
            SELECT tasks.id, tasks.task_name, tasks.task_description, tasks.location, tasks.status, 
            tasks.assigned_user_id, users.first_name, users.last_name 
            FROM tasks 
            LEFT JOIN users ON tasks.assigned_user_id = users.id
        `;

        db.query(query, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(results);
        });
    });
    // router.get('/', authenticateToken, (req, res) => {
    //     if (req.user.role !== 'event_manager' && req.user.role !== 'admin') {
    //         return res.status(403).json({ error: 'Unauthorized' });
    //     }
    
    //     const query = 'SELECT * FROM tasks';
    //     db.query(query, (err, results) => {
    //         if (err) {
    //             return res.status(500).json({ error: 'Database error' });
    //         }
    //         res.json(results);
    //     });
    // });

    // Fetch all employees
    router.get('/employees', authenticateToken, (req, res) => {
        const query = 'SELECT id, first_name, last_name FROM users'; // Fetch all users
        db.query(query, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(results); // Return all users
        });
    });

// Route to assign tasks to employees with location
router.post('/assign-task', authenticateToken, (req, res) => {
    if (req.user.role !== 'event_manager' && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    const { employeeId, taskName, taskDescription, location } = req.body;
    const assignedUserId = employeeId || null; // Allow unassigned tasks by setting null

    const query = 'INSERT INTO tasks (task_name, task_description, assigned_user_id, location, status) VALUES (?, ?, ?, ?, "pending")';
    db.query(query, [taskName, taskDescription, assignedUserId, location], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Task assigned successfully!' });
    });
});






// Fetch tasks for the logged-in employee
router.get('/my-tasks', authenticateToken, (req, res) => {
    if (req.user.role !== 'employee') {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    const query = 'SELECT * FROM tasks WHERE assigned_user_id = ?';
    db.query(query, [req.user.userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Fetch unassigned tasks for employees to see
router.get('/unassigned-tasks', authenticateToken, (req, res) => {
    if (req.user.role !== 'employee') {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    const query = 'SELECT * FROM tasks WHERE assigned_user_id IS NULL';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});




    return router;
};




