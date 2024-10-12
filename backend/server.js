const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../frontend/src')));

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

app.get('/users', (req, res) => {
    res.json([
        { name: 'Alice' },
        { name: 'Bob' }
    ]);
});

const fetchUsers = async () => {
    console.log('Fetching user data...')
    const response = await fetch(

    )
    const data = await response.json()
    console.log('User data fetched:', data)
    return data;
}