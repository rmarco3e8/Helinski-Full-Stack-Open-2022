import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logInUser } from '../reducers/loginReducer';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    dispatch(logInUser({ username, password }));
    setUsername('');
    setPassword('');
  };

  return (
    <form id="login-form" onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username-input"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password-input"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="submit-login" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
