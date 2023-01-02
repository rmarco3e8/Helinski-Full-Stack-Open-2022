const jwt = require('jsonwebtoken');
const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');

module.exports = notesRouter;

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

notesRouter.get('/', async (request, response) => {
  const notes = await Note
    .find({})
    .populate('user', { username: 1, name: 1 });
  response.json(notes);
});

notesRouter.get('/:id', async (request, response) => {
  const note = await Note
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1 });

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

/* eslint-disable no-underscore-dangle */
notesRouter.post('/', async (request, response) => {
  const { content, important } = request.body;

  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid ' });
  }

  const user = await User.findById(decodedToken.id);

  const note = new Note({
    content,
    important: important === undefined ? false : important,
    date: new Date(),
    user: user._id,
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  return response.status(201).json(savedNote);
});
/* eslint-enable no-underscore-dangle */

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

notesRouter.put('/:id', async (request, response) => {
  const { content, important } = request.body;

  const note = await Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' },
  );
  response.json(note);
});

module.exports = notesRouter;
