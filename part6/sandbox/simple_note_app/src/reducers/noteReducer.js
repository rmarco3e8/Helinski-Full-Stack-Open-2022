import { createSlice } from '@reduxjs/toolkit';

import noteService from '../services/notes';

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    appendNote(state, action) {
      state.push(action.payload);
    },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((n) => (n.id !== id ? n : changedNote));
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});

export const {
  toggleImportanceOf,
  appendNote,
  setNotes,
} = noteSlice.actions;

export const initializeNotes = () => (
  async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  }
);

export const createNote = (content) => (
  async (dispatch) => {
    const newNote = await noteService.createNew(content);
    dispatch(appendNote(newNote));
  }
);

export default noteSlice.reducer;
