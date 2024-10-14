const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const teamRoutes = require('./routes/teams');  // Make sure this is being used
require("dotenv").config();

app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/src')));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization" // Add Authorization here
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

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Register your routes here
app.use('/api', authRoutes(db));           // Auth routes
app.use('/api/tasks', taskRoutes(db));     // Task routes
app.use('/api/teams', teamRoutes(db));     // Team routes - includes employees

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});












