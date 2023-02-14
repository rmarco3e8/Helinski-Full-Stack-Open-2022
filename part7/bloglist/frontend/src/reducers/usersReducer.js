import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';
import { sendNotification } from './notificationReducer';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    appendUser(state, action) {
      state.push(action.payload);
    },
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { appendUser, setUsers } = usersSlice.actions;

export const initializeUsers = () => async (dispatch) => {
  const users = await usersService.getAll();
  dispatch(setUsers(users));
};

// unused
export const createUser = (userObject) => async (dispatch) => {
  const newUser = await usersService.create(userObject);
  const newMessage = `new user ${newUser.name} added with username ${newUser.username}`;

  dispatch(appendUser(newUser));
  dispatch(sendNotification(newMessage, false, 5));
};

export default usersSlice.reducer;
