const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');
require("dotenv").config();

app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend/src')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow any origin
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

//const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQL_DATABASE}`;

console.log(process.env.MYSQLHOST);
console.log(process.env.MYSQLUSER);
console.log(process.env.MYSQL_ROOT_PASSWORD);
console.log(process.env.MYSQL_DATABASE);
const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

app.get('/users', (req, res) => {
    if (!req.query.name) {
        query = 'SELECT * FROM users';
    } else {
        query = `SELECT * FROM users WHERE first_name LIKE '%${req.query.name}%' OR last_name LIKE '%${req.query.name}%'`;
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

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

app.get('/data', (req, res) => {
    res.json([
        { name: 'Alice' },
        { name: 'Bob' }
    ]);
});