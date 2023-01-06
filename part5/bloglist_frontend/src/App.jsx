import {
  React,
  useState,
  useEffect,
  useRef,
} from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [errorFlag, setErrorFlag] = useState(false);

  const blogFormRef = useRef();

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

  const addMessage = (newMessage, isError) => {
    setMessage(newMessage);
    setErrorFlag(isError);
    setTimeout(() => setMessage(null), 5000);
  };

  const handleLogin = async (credentials) => {
    try {
      const newUser = await loginService.login(credentials);
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(newUser));
      blogService.setToken(newUser.token);
      setUser(newUser);
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

  const addBlog = async (blogToAdd) => {
    blogFormRef.current.toggleVisibility();

    const addedBlog = await blogService.create(blogToAdd);
    const newMessage = `a new blog: ${addedBlog.title} by: ${addedBlog.author} added`;
    setBlogs(blogs.concat(addedBlog));
    addMessage(newMessage, false);
  };

  const replaceBlog = async (id, blogToUpdate) => {
    const updatedBlog = await blogService.update(id, blogToUpdate);
    setBlogs(blogs.map((b) => (b.id === id ? updatedBlog : b)));
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
            logInUser={handleLogin}
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
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm
                createBlog={addBlog}
              />
            </Togglable>

            <br />
            {blogs.map((b) => <Blog key={b.id} blog={b} updateBlog={replaceBlog} />)}
          </div>
        )}
    </>
  );
};

export default App;
