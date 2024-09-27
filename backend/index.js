// Express backend server file

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json()); // for parsing application/json

let tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const task = req.body;
    tasks.push(task); // Add task to the list
    res.status(201).json(task); // respond with the created task
})

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log('Server running on port:', PORT);
});