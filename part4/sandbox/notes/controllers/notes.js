const notesRouter = require('express').Router();
const Note = require('../models/notes');

module.exports = notesRouter;

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((foundNote) => {
      if (foundNote) {
        response.json(foundNote);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => next(err));
});

notesRouter.post('/', (request, response, next) => {
  const { body } = request;

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note.save(note)
    .then((savedNote) => {
      response.status(201).json(savedNote);
    })
    .catch((err) => next(err));
});

notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((err) => next(err));
});

notesRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body;

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((err) => next(err));
});

module.exports = notesRouter;
