const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

module.exports = (db) => {
    
    // logins
    router.post('/login', async (req, res) => {
        const { username, password } = req.body;

        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], async (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            const user = results[0];

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { userId: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ message: 'Login successful', token });
        });
    });

    // User registers
    router.post('/register', async (req, res) => {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        try {
            //checkinggg
            const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
            db.query(checkUserQuery, [email], async (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }

                if (results.length > 0) {
                    return res.status(409).json({ error: 'User with this email already exists' });
                }

                // hash
                const hashedPassword = await bcrypt.hash(password, 10);

                //usernames into db
                const insertUserQuery = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
                db.query(insertUserQuery, [username, email, hashedPassword, 'employee'], (err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Error registering the user' });
                    }
                    res.json({ message: 'Account created successfully!' });
                });
            });
        } catch (error) {
            return res.status(500).json({ error: 'Server error' });
        }
    });

    return router;
};
