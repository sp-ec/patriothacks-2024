const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');
app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend/src')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const allowedHosts = ['patriothacks-2024-production.up.railway.app', 'localhost:3000'];
    const host = req.headers.host;

    next();

    /*
    if (allowedHosts.includes(host)) {
        next();
    } else {
        console.log('Invalid Host');
        res.status(403).send('Invalid Host: ' + host);
    }
        */
});

const db = mysql.createConnection({
    host: '${{MySQL.MYSQLHOST}}',
    user: '${{MySQL.MYSQLUSER}}',
    password: '${{MySQL.MYSQL_ROOT_PASSWORD}}',
    database: '${{MySQL.MYSQL_DATABASE}}'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

app.get('/data', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

app.get('/users', (req, res) => {
    res.json([
        { name: 'Alice' },
        { name: 'Bob' }
    ]);
});