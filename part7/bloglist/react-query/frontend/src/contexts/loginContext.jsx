import React, { createContext, useReducer, useContext } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { useSendNotification } from './notificationContext';

const initialState = null;

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'setUser':
      return action.payload;
    case 'removeUser':
      return null;
    default:
      return state;
  }
};

const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [login, loginDispatch] = useReducer(loginReducer, initialState);
  /* eslint-disable react/jsx-no-constructed-context-values */
  return (
    <LoginContext.Provider value={[login, loginDispatch]}>
      {children}
    </LoginContext.Provider>
  );
  /* eslint-enable react/jsx-no-constructed-context-values */
};

export const useLoginValue = () => {
  const loginAndDispatch = useContext(LoginContext);
  return loginAndDispatch[0];
};

export const useLoginDispatch = () => {
  const loginAndDispatch = useContext(LoginContext);
  return loginAndDispatch[1];
};

export const useLogInUser = () => {
  const dispatch = useLoginDispatch();
  const sendNotification = useSendNotification();

  return async (credentials) => {
    try {
      const newUser = await loginService.login(credentials);
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(newUser));
      blogService.setToken(newUser.token);
      dispatch({ type: 'setUser', payload: newUser });
    } catch (exception) {
      sendNotification('wrong username or password', true, 5);
    }
  };
};

export const useLogOutUser = () => {
  const dispatch = useLoginDispatch();

  return async () => {
    window.localStorage.removeItem('loggedBlogappUser');
    blogService.setToken(null);
    dispatch({ type: 'removeUser' });
  };
};

export const useInitializeUser = () => {
  const dispatch = useLoginDispatch();

  return async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch({ type: 'setUser', payload: loggedUser });
      blogService.setToken(loggedUser.token);
    }
  };
};

export default LoginContext;
