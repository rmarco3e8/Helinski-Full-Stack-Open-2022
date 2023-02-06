import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  errorFlag: false,
};
let timeout = null;

const notificationSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return { message: null, errorFlag: false };
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;

export const sendNotification =
  (message, errorFlag, seconds) => async (dispatch) => {
    clearTimeout(timeout);
    dispatch(setNotification({ message, errorFlag }));
    timeout = setTimeout(() => {
      dispatch(removeNotification());
    }, seconds * 1000);
  };

export default notificationSlice.reducer;
