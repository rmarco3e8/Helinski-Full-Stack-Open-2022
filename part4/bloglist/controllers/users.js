const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
// const { userExtractor } = require('../utils/middleware');
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, author: 1 });

  response.json(users);
});

// usersRouter.get('/loggedUser', userExtractor, async (request, response) => {
//   const user = await User
//     .findById(request.user.id)
//     .populate('user', { title: 1, author: 1 });
//   if (user) {
//     response.json(user);
//   } else {
//     response.status(404).end();
//   }
// });

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!password) {
    return response.status(400).json({
      error: 'password is required',
    });
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: 'password must be at least 3 characters long',
    });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  return response.status(201).json(savedUser);
});

module.exports = usersRouter;
