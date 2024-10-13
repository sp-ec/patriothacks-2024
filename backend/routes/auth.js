const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

module.exports = (db) => {
    

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
    

            res.json({ message: 'Login successful', token, role: user.role });
        });
    });
    

    // User registers
    router.post('/register', async (req, res) => {
        const { username, email, password, first_name, last_name, role, company } = req.body;
    
        if (!username || !email || !password || !first_name || !last_name || !role || !company) {
            return res.status(400).json({ error: 'All fields are required' });
        }
    
        try {
            const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
            db.query(checkUserQuery, [email], async (err, results) => {
                if (err) {
                    console.error('Database error during user check:', err);
                    return res.status(500).json({ error: 'Database error' });
                }
    
                if (results.length > 0) {
                    return res.status(409).json({ error: 'User with this email already exists' });
                }
    
                const hashedPassword = await bcrypt.hash(password, 10);
    
                // Check if a teams in the company
                const checkTeamQuery = 'SELECT id FROM teams WHERE company = ?';
                db.query(checkTeamQuery, [company], (err, teamResults) => {
                    if (err) {
                        return res.status(500).json({ error: 'Database error during team check' });
                    }
    
                    let teamId;
    
                    if (teamResults.length === 0) {
                        const createTeamQuery = 'INSERT INTO teams (name, company) VALUES (?, ?)';
                        db.query(createTeamQuery, [company, company], (err, teamInsertResult) => {
                            if (err) {
                                return res.status(500).json({ error: 'Error creating a new team' });
                            }
                            teamId = teamInsertResult.insertId;
                            insertUser(teamId);
                        });
                    } else {
                        teamId = teamResults[0].id;
                        insertUser(teamId);
                    }
    
                    //ed- update 2
                    const insertUser = (teamId) => {
                        const insertUserQuery = `
                            INSERT INTO users (username, email, password, first_name, last_name, role, company, team_id)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                        `;
                        db.query(insertUserQuery, [username, email, hashedPassword, first_name, last_name, role, company, teamId], (err) => {
                            if (err) {
                                return res.status(500).json({ error: 'Error registering the user' });
                            }
    
                            res.json({ message: 'Account created and assigned to a team successfully!' });
                        });
                    };
                });
            });
        } catch (error) {
            return res.status(500).json({ error: 'Server error' });
        }
    });
    
    

    return router;
};
