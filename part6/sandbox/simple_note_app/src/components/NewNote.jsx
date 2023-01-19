// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { createNote } from '../reducers/noteReducer';

// const NewNote = () => {
//   const dispatch = useDispatch();

//   /* eslint-disable no-param-reassign */
//   const addNote = async (event) => {
//     event.preventDefault();
//     const content = event.target.note.value;
//     event.target.note.value = '';
//     dispatch(createNote(content));
//   };
//   /* eslint-disable no-param-reassign */

//   return (
//     <form onSubmit={addNote}>
//       <input name="note" />
//       <button type="submit">add</button>
//     </form>
//   );
// };

// export default NewNote;

import React from 'react';
import { connect } from 'react-redux';
import { createNote } from '../reducers/noteReducer';

/* eslint-disable react/destructuring-assignment */
const NewNote = (props) => {
  /* eslint-disable no-param-reassign */
  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    props.createNote(content);
  };
  /* eslint-disable no-param-reassign */

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
};
/* eslint-enable react/destructuring-assignment */

export default connect(
  null,
  { createNote },
)(NewNote);
