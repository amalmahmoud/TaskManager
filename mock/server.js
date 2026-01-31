const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());
const tasksFile = path.join(__dirname, 'tasks.json');
const statisticsFile = path.join(__dirname, 'statistics.json');

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeJson = (filePath, data) =>
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

app.get('/tasks', (req, res) => {
  try {
    const tasks = readJson(tasksFile);
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
    const assignee = req.body.assignee ?? {
        "name": "Unassigned",
        "id": "unassigned",
        "avatar": "?"
        };
    const newTask = {
      id: `task-0${data.tasks.length + 1}`,
      ...req.body,
      assignee,
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

app.get('/statistics', (req, res) => {
  try {
    const statistics = readJson(statisticsFile);
    res.json(statistics);
  } catch (err) {
    res.status(500).json({ message: 'Failed to read statistics.json' });
  }
});

app.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`);
});
