const jwt = require('jsonwebtoken');
const path = require('path');
const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const catchAll = (request, response) => {
  response.status(200).sendFile(path.resolve('./build', 'index.html'));
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  }
  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    });
  }

  return next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  let token = null;

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7);
  }

  request.token = token;
  return next();
};

const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  request.user = decodedToken;
  return next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  catchAll,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
