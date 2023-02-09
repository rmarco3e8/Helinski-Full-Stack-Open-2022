import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { sendNotification } from './notificationReducer';

const loginSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser() {
      return null;
    },
  },
});

export const { setUser, removeUser } = loginSlice.actions;

export const logInUser = (credentials) => async (dispatch) => {
  try {
    const newUser = await loginService.login(credentials);
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(newUser));
    blogService.setToken(newUser.token);
    dispatch(setUser(newUser));
  } catch (exception) {
    dispatch(sendNotification('wrong username or password', true, 5));
  }
};

export const logOutUser = () => async (dispatch) => {
  window.localStorage.removeItem('loggedBlogappUser');
  blogService.setToken(null);
  dispatch(removeUser());
};

export const initializeUser = () => async (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
  if (loggedUserJSON) {
    const loggedUser = JSON.parse(loggedUserJSON);
    dispatch(setUser(loggedUser));
    blogService.setToken(loggedUser.token);
  }
};

export default loginSlice.reducer;
