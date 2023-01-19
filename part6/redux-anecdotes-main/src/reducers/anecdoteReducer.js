import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      return state.map((a) => (a.id === updatedAnecdote.id ? updatedAnecdote : a));
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => (
  async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
);

export const createAnecdote = (content) => (
  async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch(appendAnecdote(newAnecdote));
  }
);

export const addVoteTo = (anecdote) => (
  async (dispatch) => {
    const { id } = anecdote;
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    await anecdoteService.update(id, updatedAnecdote);
    dispatch(updateAnecdote(updatedAnecdote));
  }
);

export default anecdoteSlice.reducer;
