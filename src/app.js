const express = require('express');

const app = express();
app.use(express.json());

let items = [];
let nextId = 1;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }
  const item = { id: nextId++, name };
  items.push(item);
  res.status(201).json(item);
});

app.delete('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'item not found' });
  }
  items.splice(index, 1);
  res.status(204).send();
});

module.exports = app;
