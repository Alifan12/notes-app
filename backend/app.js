const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./models');
const Note = require('./models/note');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

let notes = [];

// Sync database
sequelize.sync().then(() => {
  console.log('Database synced');
});

// GET all notes
app.get('/notes', async (req, res) => {
  const notes = await Note.findAll();
  res.json(notes);
});

// POST new note
app.post('/notes', async (req, res) => {
  const { text } = req.body;
  if (text?.trim()) {
    const newNote = await Note.create({ text });
    res.status(201).json(newNote);
  } else {
    res.status(400).json({ error: 'Note cannot be empty' });
  }
});

// DELETE note
app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  await Note.destroy({ where: { id } });
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});