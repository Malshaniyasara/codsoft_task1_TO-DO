const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

let tasks = [];

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { taskText } = req.body;
  if (taskText) {
    tasks.push(taskText);
    res.status(201).jsson({ message: 'Task added successfully' });
  } else {
    res.status(400).json({ error: 'Invalid task' });
  }
});

// Edit a task
app.put('/tasks/:index', (req, res) => {
  const index = req.params.index;
  const { updatedTaskText } = req.body;
  if (tasks[index] !== undefined && updatedTaskText) {
    tasks[index] = updatedTaskText;
    res.json({ message: 'Task updated successfully' });
  } else {
    res.status(400).json({ error: 'Invalid task index or task text' });
  }
});

// Delete a task
app.delete('/tasks/:index', (req, res) => {
  const index = req.params.index;
  if (tasks[index] !== undefined) {
    tasks.splice(index, 1);
    res.json({ message: 'Task deleted successfully' });
  } else {
    res.status(400).json({ error: 'Invalid task index' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
