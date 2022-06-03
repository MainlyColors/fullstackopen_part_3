const express = require('express');
const app = express();

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2022-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 3,
    content: 'Browser can execute only JavaScript',
    date: '2022-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2022-05-30T19:20:14.298Z',
    important: true,
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  // sending a message is not required because REST APIs are interfaces so the 404 is only thing needed
  if (note) res.json(note);
  else res.status(404).send('Note not found');
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT} you fool`);
});
