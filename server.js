
const express = require('express');
const Task = require('./models/task');
const db = require('./db');

const app = express();
app.use(express.json());

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const { title, description, done } = req.body;

    const task = new Task({ title, description, done });
    await task.save();
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const { title, description, done } = req.body;
    const taskId = req.params.id;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, description, done },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;

    await Task.findByIdAndDelete(taskId);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
