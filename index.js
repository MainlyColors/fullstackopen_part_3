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
    id: 2,
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

// ***************
// MIDDLEWARE - before routes
// ***************

// parses incoming requests with JSON payloads
// mounts the middleware functions at the specified path
// app.use([path,] callback [, callback...]) takes an optional path argument
// if path is not used, defaults to "/" meaning middleware mounted w/o a path will be executed for every request to the app.
app.use(express.json());

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method);
  console.log('Path:  ', req.path);
  console.log('Body:  ', req.body);
  console.log('---');
  next();
};

app.use(requestLogger);

// ***************
// UTIL functions
// ***************

const generateID = () => {
  // not recommended for getting max
  const maxID = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxID + 1;
};

// ***************
// ROUTES
// ***************

app.post('/api/notes', (req, res) => {
  const body = req.body;

  // if empty
  if (!body.content) {
    return res.status(400).json({
      error: 'content missing',
    });
  }

  const note = {
    content: body.content,
    important: body.important || false, // if missing, set false
    date: new Date(), // better to set date on server because we can't trust host machine
    id: generateID(),
  };

  notes = notes.concat(note);

  res.json(note);
});

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

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);

  res.status(204).end();
});

// ***************
// MIDDLEWARE - after routes aka if no routes get picked
// ***************

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT} you fool`);
});
