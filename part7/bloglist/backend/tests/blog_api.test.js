const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('p455w0rd', 10);
  const user = new User({ username: 'root', name: 'bob', passwordHash });
  await user.save();

  await Blog.deleteMany({});

  /* eslint-disable no-restricted-syntax, no-await-in-loop, no-underscore-dangle */
  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog({ ...blog, user: user._id });
    await blogObject.save();

    user.blogs = user.blogs.concat(blogObject._id);
    await user.save();
  }
  /* eslint-enable no-restricted-syntax, no-await-in-loop, no-underscore-dangle */
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

  const result = await api
    .post('/api/login')
    .send({ username: 'root', password: 'p455w0rd' })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .set({ Authorization: `bearer ${result.body.token}` })
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((blog) => {
    const { id, user, ...rest } = blog;
    return rest;
  });
  expect(contents).toContainEqual(blogToAdd);
});

test('fails with satus code 401 if token is not provided', async () => {
  const blogToAdd = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  };

  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(401)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

  const contents = blogsAtEnd.map((blog) => {
    const { id, user, ...rest } = blog;
    return rest;
  });
  expect(contents).not.toContainEqual(blogToAdd);
});

test('a new blog missing number of likes defaults to 0 likes', async () => {
  const blogToAdd = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  };

  const result = await api
    .post('/api/login')
    .send({ username: 'root', password: 'p455w0rd' })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api
    .post('/api/blogs')
    .send(blogToAdd)
    .set({ Authorization: `bearer ${result.body.token}` })
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

  const result = await api
    .post('/api/login')
    .send({ username: 'root', password: 'p455w0rd' })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .set({ Authorization: `bearer ${result.body.token}` })
    .expect(400);

  const blogWithoutURL = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 5,
  };

  await api
    .post('/api/blogs')
    .send(blogWithoutURL)
    .set({ Authorization: `bearer ${result.body.token}` })
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  const processedBlogs = blogsAtEnd.map((blog) => {
    const { id, user, ...rest } = blog;
    return rest;
  });

  expect(processedBlogs).not.toContainEqual(blogWithoutTitle);
  expect(processedBlogs).not.toContainEqual(blogWithoutURL);
});

describe('deletion of a blog post', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    const result = await api
      .post('/api/login')
      .send({ username: 'root', password: 'p455w0rd' })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `bearer ${result.body.token}` })
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).not.toContainEqual(blogToDelete);
  });
});

describe('updating a blog post', () => {
  test('succeeds with valid data', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const blogUpdated = { ...blogToUpdate, likes: blogToUpdate.likes + 8 };

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogUpdated)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBe(blogToUpdate.likes + 8);
  });

  test('fails with satus code 404 if data is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const { likes, ...malformedBlog } = blogToUpdate;

    // const result = await api
    //   .post('/api/login')
    //   .send({ username: 'root', password: 'p455w0rd' })
    //   .expect(200)
    //   .expect('Content-Type', /application\/json/);

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(malformedBlog)
      // .set({ Authorization: `bearer ${result.body.token}` })
      .expect(404);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toContainEqual(blogToUpdate);
  });
});

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('p455w0rd', 10);
    const user = new User({ username: 'root', name: 'bob', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'joe',
      name: 'shmoe',
      password: 'secret password...',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'shmoe',
      password: 'secret password...',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username must be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails with proper statuscode and message if username is missing', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: 'shmoe',
      password: 'secret password...',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username is required');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'ro',
      name: 'shmoe',
      password: 'secret password...',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain(
      'username must be at least 3 characters long'
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails with proper statuscode and message if password is missing', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'joe',
      name: 'shmoe',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('password is required');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails with proper statuscode and message if password is too short', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'joe',
      name: 'shmoe',
      password: 'se',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain(
      'password must be at least 3 characters long'
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
