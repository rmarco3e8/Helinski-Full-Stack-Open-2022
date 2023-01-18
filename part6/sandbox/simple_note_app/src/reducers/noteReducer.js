import { createSlice } from '@reduxjs/toolkit';

// const initialState = [
//   {
//     content: 'reducer defines how redux store works',
//     important: true,
//     id: 1,
//   },
//   {
//     content: 'state of store can contain any data',
//     important: false,
//     id: 2,
//   },
// ];

// const generateId = () => Number((Math.random() * 1000000).toFixed(0));

// const noteReducer = (state = initialState, action = 'DO_NOTHING') => {
//   switch (action.type) {
//     case 'NEW_NOTE':
//       return state.concat(action.data);
//     case 'TOGGLE_IMPORTANCE': {
//       const { id } = action.data;
//       const noteToChange = state.find((n) => n.id === id);
//       const changedNote = {
//         ...noteToChange,
//         important: !noteToChange.important,
//       };
//       return state.map((note) => (note.id !== id ? note : changedNote));
//     }
//     default:
//       return state;
//   }
// };

// export const createNote = (content) => (
//   {
//     type: 'NEW_NOTE',
//     data: {
//       content,
//       important: false,
//       id: generateId(),
//     },
//   }
// );

// export const toggleImportanceOf = (id) => (
//   {
//     type: 'TOGGLE_IMPORTANCE',
//     data: { id },
//   }
// );

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
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
  createNote,
  toggleImportanceOf,
  appendNote,
  setNotes,
} = noteSlice.actions;

export default noteSlice.reducer;
