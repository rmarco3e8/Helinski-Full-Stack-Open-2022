import { React, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom';
import { Routes, Route, useMatch } from 'react-router-dom';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Menu from './components/Menu';
import UsersView from './components/UsersView';
import SingleUserView from './components/SingleUserView';
import { initializeBlogs, createBlog } from './reducers/blogReducer';
import { logOutUser, initializeUser } from './reducers/loginReducer';
import { initializeUsers } from './reducers/usersReducer';
import './index.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
    dispatch(initializeUsers());
  }, []);

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  const blogFormRef = useRef();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logOutUser());
  };

  const addBlog = async (blogToAdd) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogToAdd));
  };

  const sortedBlogs = structuredClone(blogs).sort(
    (blog1, blog2) => blog2.likes - blog1.likes
  );

  const match = useMatch('/users/:id');
  const userToView = match ? users.find((u) => u.id === match.params.id) : null;

  return (
    <>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <p>
            {`${user.name} logged in`}
            &nbsp;
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </p>
          <Menu />
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h2>create new</h2>
                  <Togglable buttonLabel="new blog" ref={blogFormRef}>
                    <BlogForm createBlog={addBlog} />
                  </Togglable>

                  <br />
                  {sortedBlogs.map((b) => (
                    <Blog key={b.id} blog={b} loggedUser={user.username} />
                  ))}
                </div>
              }
            />
            <Route path="/users" element={<UsersView users={users} />} />
            <Route
              path="/users/:id"
              element={<SingleUserView user={userToView} />}
            />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
