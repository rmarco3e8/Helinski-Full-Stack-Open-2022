import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogReducer';
import loginReducer from './reducers/loginReducer';
import notificationReducer from './reducers/notificationReducer';
import usersReducer from './reducers/usersReducer';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: loginReducer,
    notification: notificationReducer,
    users: usersReducer,
  },
});

export default store;
