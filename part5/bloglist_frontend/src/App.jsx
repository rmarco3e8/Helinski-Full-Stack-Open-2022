import { React, useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

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
      console.log('Wrong credentials');
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    window.localStorage.removeItem('loggedBlogappUser');
    blogService.setToken(null);
    setUser(null);
  };

  return (
    <>
      <h2>blogs</h2>
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
            {blogs.map((b) => <Blog key={b.id} blog={b} />)}
          </div>
        )}
    </>
  );
};

export default App;
