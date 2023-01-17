import { createSlice } from '@reduxjs/toolkit';

const initialState = 'initial message';

const notificationSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    sendNotification(state, action) {
      return action.payload;
    },
  },
});

export const { sendNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
