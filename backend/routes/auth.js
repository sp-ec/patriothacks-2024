
// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const router = express.Router();

// module.exports = (db) => {

//     // User login
//     router.post('/login', async (req, res) => {
//         const { username, password } = req.body;

//         const query = 'SELECT * FROM users WHERE username = ?';
//         db.query(query, [username], async (err, results) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Database error' });
//             }

//             if (results.length === 0) {
//                 return res.status(404).json({ error: 'User not found' });
//             }

//             const user = results[0];

//             const passwordMatch = await bcrypt.compare(password, user.password);
//             if (!passwordMatch) {
//                 return res.status(401).json({ error: 'Invalid credentials' });
//             }

//             const token = jwt.sign(
//                 { userId: user.id, role: user.role },
//                 process.env.JWT_SECRET,
//                 { expiresIn: '1h' }
//             );

//             res.json({ message: 'Login successful', token, role: user.role });
//         });
//     });

//     // User registration
//     router.post('/register', async (req, res) => {
//         const { username, email, password, first_name, last_name, role, company } = req.body;

//         if (!username || !email || !password || !first_name || !last_name || !role || !company) {
//             return res.status(400).json({ error: 'All fields are required' });
//         }

//         try {
//             const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
//             db.query(checkUserQuery, [email], async (err, results) => {
//                 if (err) {
//                     console.error('Database error during user check:', err);
//                     return res.status(500).json({ error: 'Database error' });
//                 }

//                 if (results.length > 0) {
//                     return res.status(409).json({ error: 'User with this email already exists' });
//                 }

//                 const hashedPassword = await bcrypt.hash(password, 10);

//                 const checkTeamQuery = 'SELECT id FROM teams WHERE company = ?';
//                 db.query(checkTeamQuery, [company], (err, teamResults) => {
//                     if (err) {
//                         return res.status(500).json({ error: 'Database error during team check' });
//                     }

//                     let teamId;

//                     // Move `insertUser` function here
//                     const insertUser = (teamId) => {
//                         const insertUserQuery = `
//                             INSERT INTO users (username, email, password, first_name, last_name, role, company, team_id)
//                             VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//                         `;
//                         db.query(insertUserQuery, [username, email, hashedPassword, first_name, last_name, role, company, teamId], (err) => {
//                             if (err) {
//                                 return res.status(500).json({ error: 'Error registering the user' });
//                             }

//                             res.json({ message: 'Account created and assigned to a team successfully!' });
//                         });
//                     };

//                     if (teamResults.length === 0) {
//                         const createTeamQuery = 'INSERT INTO teams (name, company) VALUES (?, ?)';
//                         db.query(createTeamQuery, [company, company], (err, teamInsertResult) => {
//                             if (err) {
//                                 return res.status(500).json({ error: 'Error creating a new team' });
//                             }
//                             teamId = teamInsertResult.insertId;
//                             insertUser(teamId);
//                         });
//                     } else {
//                         teamId = teamResults[0].id;
//                         insertUser(teamId);
//                     }
//                 });
//             });
//         } catch (error) {
//             return res.status(500).json({ error: 'Server error' });
//         }
//     });

//     return router;
// };







const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

module.exports = (db) => {

    // Middleware to authenticate JWT token
    const authenticateToken = (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1]; // Extract token from header
        if (!token) return res.status(403).json({ error: 'Token is missing' });

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ error: 'Invalid token' });
            req.user = user;  // Attach user info from the token to the request object
            next();
        });
    };

    // User login
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

    // Route to update user profile with location
    router.put('/update-location', authenticateToken, (req, res) => {
        const { location } = req.body;

        if (!location) {
            return res.status(400).json({ error: 'Location is required' });
        }

        const query = 'UPDATE users SET location = ? WHERE id = ?';
        db.query(query, [location, req.user.userId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            res.json({ message: 'Location updated successfully!' });
        });
    });

    // User registration
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

                const checkTeamQuery = 'SELECT id FROM teams WHERE company = ?';
                db.query(checkTeamQuery, [company], (err, teamResults) => {
                    if (err) {
                        return res.status(500).json({ error: 'Database error during team check' });
                    }

                    let teamId;

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
                });
            });
        } catch (error) {
            return res.status(500).json({ error: 'Server error' });
        }
    });

    
    return router;
};


