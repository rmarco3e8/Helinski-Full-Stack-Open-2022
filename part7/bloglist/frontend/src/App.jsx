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
import {
  initializeBlogs,
  createBlog,
  removeBlog,
} from './reducers/blogReducer';
import './index.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const blogs = useSelector((state) => state.blogs);
  const [user, setUser] = useState(null);
  const message = useSelector((state) => state.notification.message);
  const errorFlag = useSelector((state) => state.notification.errorFlag);

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

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
    dispatch(createBlog(blogToAdd));
  };

  const deleteBlog = async (id) => {
    dispatch(removeBlog(id));
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
