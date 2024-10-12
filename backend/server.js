const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
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

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

app.get('/users', (req, res) => {
    res.json([
        { name: 'Alice' },
        { name: 'Bob' }
    ]);
});