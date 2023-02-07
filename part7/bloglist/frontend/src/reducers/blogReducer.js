import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { sendNotification } from './notificationReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((b) => (b.id === updatedBlog.id ? updatedBlog : b));
    },
    setBlogs(state, action) {
      return action.payload;
    },
    deleteBlog(state, action) {
      return state.filter((b) => b.id !== action.payload);
    },
  },
});

export const { appendBlog, updateBlog, setBlogs, deleteBlog } =
  blogSlice.actions;

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const createBlog = (blogObject) => async (dispatch) => {
  const newBlog = await blogService.create(blogObject);
  const newMessage = `a new blog: ${newBlog.title} by: ${newBlog.author} added`;

  dispatch(appendBlog(newBlog));
  dispatch(sendNotification(newMessage, false, 5));
};

export const removeBlog = (id) => async (dispatch) => {
  try {
    await blogService.remove(id);
    dispatch(deleteBlog(id));
  } catch (exception) {
    console.log(exception);
    dispatch(sendNotification(exception.response.data.error, true, 5));
  }
};

export const addLikeTo = (blog) => async (dispatch) => {
  const { id } = blog;
  const replacementBlog = {
    ...blog,
    likes: blog.likes + 1,
    user: blog.user.id,
  };
  const updatedBlog = await blogService.update(id, replacementBlog);
  dispatch(updateBlog(updatedBlog));
};

export default blogSlice.reducer;
