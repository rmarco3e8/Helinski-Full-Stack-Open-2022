const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('express-async-errors');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const app = express();

console.log(config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((err) => {
    logger.info('Error connecting to MongoDB', err);
  });

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

// app.use('/api/blogs', middleware.userExtractor, blogsRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

/* eslint-disable global-require */
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}
/* eslint-enable global-require */

app.use('api/*', middleware.unknownEndpoint);
app.use('*', middleware.catchAll);
app.use(middleware.errorHandler);

module.exports = app;
