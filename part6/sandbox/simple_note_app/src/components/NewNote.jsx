import React from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/noteReducer';
import noteService from '../services/notes';

const NewNote = () => {
  const dispatch = useDispatch();

  /* eslint-disable no-param-reassign */
  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    const newNote = await noteService.createNew(content);
    dispatch(createNote(newNote));
  };
  /* eslint-disable no-param-reassign */

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
};

export default NewNote;
