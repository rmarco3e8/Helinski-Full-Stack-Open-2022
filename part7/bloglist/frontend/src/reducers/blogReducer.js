import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

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
  },
});

export const { appendBlog, updateBlog, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const createBlog = (blogObject) => async (dispatch) => {
  const newBlog = await blogService.create(blogObject);
  dispatch(appendBlog(newBlog));
};

export const addLikeTo = (blog) => async (dispatch) => {
  const { id } = blog;
  const updatedBlog = { ...blog, likes: blog.likes + 1 };
  await blogService.update(id, updatedBlog);
  dispatch(updateBlog(updatedBlog));
};

export default blogSlice.reducer;
