const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const teamRoutes = require('./routes/teams');
require("dotenv").config();


app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/src')));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQLPORT,
    connectTimeout: 10000
});

app.get('/users', (req, res) => {
    if (!req.query.name) {
        query = 'SELECT * FROM users';
    } else {
        query = `SELECT * FROM users WHERE full_name LIKE '%${req.query.name}%'`;
    }

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');

    app.use('/api', authRoutes(db));
    app.use('/api/tasks', taskRoutes(db));
    app.use('/api/teams', teamRoutes(db));

    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
});

app.use(express.static(path.join(__dirname, '../frontend/src')));
