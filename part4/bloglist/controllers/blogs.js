const blogsRouter = require('express').Router();
const { userExtractor } = require('../utils/middleware');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1 });
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

/* eslint-disable no-underscore-dangle */
blogsRouter.post('/', userExtractor, async (request, response) => {
  const {
    title,
    author,
    url,
    likes,
  } = request.body;

  const user = await User.findById(request.user.id);

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  await savedBlog.populate('user', { username: 1, name: 1 });

  return response.status(201).json(savedBlog);
});
/* eslint-enable no-underscore-dangle */

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() !== request.user.id.toString()) {
    return response.status(401).json({ error: 'cannot delete another user\'s blog' });
  }

  await Blog.findByIdAndRemove(request.params.id);
  return response.status(204).end();
});

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const {
    title,
    author,
    url,
    likes,
    user,
  } = request.body;

  if (user.toString() !== request.user.id.toString()) {
    return response.status(401).json({ error: 'cannot update another user\'s blog' });
  }

  if (!likes) {
    return response.status(404).send();
  }

  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      title,
      author,
      url,
      likes,
    },
    { new: true, runValidators: true, context: 'query' },
  );

  await blog.populate('user', { username: 1, name: 1 });
  return response.json(blog);
});

module.exports = blogsRouter;
