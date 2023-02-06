import { React, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import { sendNotification } from './reducers/notificationReducer';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  // const [message, setMessage] = useState(null);
  const message = useSelector((state) => state.notification.message);
  // const [errorFlag, setErrorFlag] = useState(false);
  const errorFlag = useSelector((state) => state.notification.errorFlag);

  const dispatch = useDispatch();

  console.log(message);
  console.log(errorFlag);

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

  // const addMessage = (newMessage, isError) => {
  //   setMessage(newMessage);
  //   setErrorFlag(isError);
  //   setTimeout(() => setMessage(null), 5000);
  // };

  const handleLogin = async (credentials) => {
    try {
      const newUser = await loginService.login(credentials);
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(newUser));
      blogService.setToken(newUser.token);
      setUser(newUser);
    } catch (exception) {
      dispatch(sendNotification('wrong username or password', true, 5));
      console.log('HERE');
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
    dispatch(sendNotification(newMessage, false, 5));
  };

  const replaceBlog = async (id, blogToUpdate) => {
    const updatedBlog = await blogService.update(id, blogToUpdate);
    setBlogs(blogs.map((b) => (b.id === id ? updatedBlog : b)));
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (exception) {
      console.log(exception);
      dispatch(sendNotification(exception.response.data.error, true, 5));
    }
  };

  const sortedBlogs = structuredClone(blogs).sort(
    (blog1, blog2) => blog2.likes - blog1.likes
  );

  return (
    <>
      <h2>blogs</h2>
      <Notification message={message} errorFlag={errorFlag} />
      {user === null ? (
        <LoginForm logInUser={handleLogin} />
      ) : (
        <div>
          <p>
            {`${user.name} logged in`}
            &nbsp;
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </p>
          <h2>create new</h2>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          <br />
          {sortedBlogs.map((b) => (
            <Blog
              key={b.id}
              blog={b}
              updateBlog={replaceBlog}
              removeBlog={deleteBlog}
              loggedUser={user.username}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
