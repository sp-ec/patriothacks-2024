// const mysql = require('mysql2');
// const bcrypt = require('bcrypt');
// require('dotenv').config();  // Make sure this is at the top

// // Database connection
// const db = mysql.createConnection({
//     host: process.env.MYSQLHOST,
//     user: process.env.MYSQLUSER,
//     password: process.env.MYSQL_ROOT_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     port: process.env.MYSQLPORT,
// });

// // Connect to the database
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//         return;
//     }
//     console.log('Connected to the MySQL database');

//     // Insert test user
//     const username = 'testuser';
//     const email = 'testuser@example.com';
//     const password = 'password123';
//     const firstName = 'Test';
//     const lastName = 'User';
//     const role = 'employee';

//     // Hash the password
//     bcrypt.hash(password, 10, (err, hashedPassword) => {
//         if (err) {
//             console.error('Error hashing password:', err);
//             return;
//         }

//         // Log the hashed password to check if it's working
//         console.log('Hashed password:', hashedPassword);

//         // Insert the user into the database
//         const query = `
//             INSERT INTO users (username, email, password, first_name, last_name, role)
//             VALUES (?, ?, ?, ?, ?, ?)
//         `;

//         db.query(query, [username, email, hashedPassword, firstName, lastName, role], (err, result) => {
//             if (err) {
//                 console.error('Error inserting test user:', err);
//                 return;
//             }
//             console.log('Test user inserted successfully');
//             db.end();  // Close the database connection
//         });
//     });
// });
