import { React, useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState(null);
  const [errorFlag, setErrorFlag] = useState(false);

  useEffect(() => {
    blogService.getAll().then((b) => setBlogs(b));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const resetBlogForm = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const addMessage = (newMessage, isError) => {
    setMessage(newMessage);
    setErrorFlag(isError);
    setTimeout(() => setMessage(null), 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const newUser = await loginService.login(
        { username, password },
      );
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(newUser));
      blogService.setToken(newUser.token);
      setUser(newUser);
      setUsername('');
      setPassword('');
    } catch (exception) {
      addMessage('wrong username or password', true);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    window.localStorage.removeItem('loggedBlogappUser');
    blogService.setToken(null);
    setUser(null);
  };

  const addBlog = async (event) => {
    event.preventDefault();

    const blogToAdd = {
      title,
      author,
      url,
    };

    const addedBlog = await blogService.create(blogToAdd);
    const newMessage = `a new blog: ${addedBlog.title} by: ${addedBlog.author} added`;
    setBlogs(blogs.concat(addedBlog));
    addMessage(newMessage, false);
    resetBlogForm();
  };

  return (
    <>
      <h2>blogs</h2>
      <Notification
        message={message}
        errorFlag={errorFlag}
      />
      {user === null
        ? (
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        )
        : (
          <div>
            <p>
              {`${user.name} logged in`}
              &nbsp;
              <button type="button" onClick={handleLogout}>logout</button>
            </p>
            <h2>create new</h2>
            <BlogForm
              addBlog={addBlog}
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
            />
            <br />
            {blogs.map((b) => <Blog key={b.id} blog={b} />)}
          </div>
        )}
    </>
  );
};

export default App;
