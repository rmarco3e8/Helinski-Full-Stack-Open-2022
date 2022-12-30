const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blogs');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  /* eslint-disable no-restricted-syntax, no-await-in-loop */
  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
  /* eslint-enable no-restricted-syntax, no-await-in-loop */
});

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('blogs have the right unique identifier', async () => {
  const blogs = await helper.blogsInDb();
  const blogToView = blogs[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(resultBlog.body.id).toBeDefined();
});

test('a valid blog can be added', async () => {
  const blogToAdd = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  };

  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((blog) => {
    const { id, ...rest } = blog;
    return rest;
  });
  expect(contents).toContainEqual(blogToAdd);
});

test('a new blog missing number of likes defaults to 0 likes', async () => {
  const blogToAdd = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  };

  const response = await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = response.body;
  expect(blogsAtEnd.likes).toBe(0);
});

test('a new blog missing title or url is not added', async () => {
  const blogWithoutTitle = {
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  };

  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400);

  const blogWithoutURL = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 5,
  };

  await api
    .post('/api/blogs')
    .send(blogWithoutURL)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  const processedBlogs = blogsAtEnd.map((blog) => {
    const { id, ...rest } = blog;
    return rest;
  });

  expect(processedBlogs).not.toContainEqual(blogWithoutTitle);
  expect(processedBlogs).not.toContainEqual(blogWithoutURL);
});

afterAll(() => {
  mongoose.connection.close();
});
