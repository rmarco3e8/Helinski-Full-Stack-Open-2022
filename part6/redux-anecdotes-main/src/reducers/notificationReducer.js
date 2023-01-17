import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const notificationSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    /* eslint-disable no-unused-vars */
    removeNotification() {
      return null;
    },
    /* eslint-enable no-unused-vars */
  },
});

export const { setNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
