require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Person = require('./models/person');
// const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

// morgan.token('post-data', (req, res) => {
//   if(req.method === 'POST') {
//     return JSON.stringify(req.body);
//   } else {
//     return '';
//   }
// });

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};
app.use(requestLogger);

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then((people) => {
      response.json(people);
    });
});

app.get('/api/info', (request, response) => {
  Person.countDocuments()
    .then((count) => {
      response.send(
        `<div>
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
        </div>`,
      );
    });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((foundPerson) => {
      if (foundPerson) {
        response.json(foundPerson);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body;

  const person = new Person({
    name,
    number,
  });
  Person.exists({ name })
    .then((foundId) => {
      if (foundId) {
        const error = new Error(`${name} already exists`);
        error.name = 'DuplicateNameError';
        throw error;
      } else {
        return person.save();
      }
    })
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((updatedPerson) => {
      if (updatedPerson) {
        response.json(updatedPerson);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'DuplicateNameError') {
    return response.status(409).json({ error: error.message });
  }

  return next(error);
};

app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
