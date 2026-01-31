const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());
const tasksFile = path.join(__dirname, 'tasks.json');
const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeJson = (filePath, data) =>
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

app.get('/tasks', (req, res) => {
  try {
    const tasks = JSON.parse(fs.readFileSync('./tasks.json', 'utf8'));
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to read tasks.json' });
  }
});

app.post('/tasks', (req, res) => {
  try {
    const data = readJson(tasksFile);

    if (!Array.isArray(data.tasks)) data.tasks = [];
    const completedAt =
      req.body.status === 'done'
        ? new Date().toISOString() 
        : null;

    const newTask = {
      id: `task-0${data.tasks.length + 1}`,
      ...req.body,
      completedAt,
    };

    data.tasks.push(newTask);
    data.meta = {
      totalCount: data.tasks.length,
      lastUpdated: new Date().toISOString(),
    };
    writeJson(tasksFile, data);
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Failed writing tasks.json:', err);
    res.status(500).json({ message: 'Failed to write tasks.json' });
  }
});

app.put('/tasks/:id', (req, res) => {
  try {
    const data = readJson(tasksFile);

    if (!Array.isArray(data.tasks)) data.tasks = [];

    const id = req.params.id;
    const index = data.tasks.findIndex((t) => t.id === id);

    if (index === -1) return res.status(404).json({ message: 'Task not found' });

    const task = data.tasks[index];

    const completedAt =
      req.body.status === 'done' && task.status !== 'done'
        ? new Date().toISOString() :  null;

    data.tasks[index] = {
      ...task,
      ...req.body,
      completedAt,
    };

    data.meta = {
      ...data.meta,
      lastUpdated: new Date().toISOString(),
    };

    writeJson(tasksFile, data);

    res.json(data.tasks[index]);
  } catch (err) {
    console.error('Failed updating tasks.json:', err);
    res.status(500).json({ message: 'Failed to update tasks.json' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  try {
    const data = readJson(tasksFile);
    const id = req.params.id;
    const index = data.tasks.findIndex((t) => t.id === id);

    if (index === -1) return res.status(404).json({ message: 'Task not found' });

     const deletedTask = data.tasks.splice(index, 1)[0];

    res.json({ message: 'Task deleted', task: deletedTask });

    data.meta = {
      totalCount: data.tasks.length,
      lastUpdated: new Date().toISOString(),
    };

    writeJson(tasksFile, data);

    res.json({ message: 'Task deleted', task: deletedTask });
  } catch (err) {
    console.error('Failed updating tasks.json:', err);
    res.status(500).json({ message: 'Failed to update tasks.json' });
  }
});

app.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`);
});
