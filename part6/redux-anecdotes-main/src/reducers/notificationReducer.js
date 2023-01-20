import { createSlice } from '@reduxjs/toolkit';

const initialState = null;
let timeout = null;

const notificationSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return null;
    },
  },
});

export const { setNotification, removeNotification } = notificationSlice.actions;

export const sendNotification = (message, seconds) => (
  async (dispatch) => {
    clearTimeout(timeout);
    dispatch(setNotification(message));
    timeout = setTimeout(() => {
      dispatch(removeNotification());
    }, seconds * 1000);
  }
);

export default notificationSlice.reducer;
