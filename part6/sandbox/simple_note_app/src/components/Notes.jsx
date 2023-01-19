/* more modern, simpler way, using the hook API from react-redux */
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleImportanceOf } from '../reducers/noteReducer';

// const Note = ({ note, handleClick }) => (
//   <li onClick={handleClick}>
//     {note.content}
//     <strong> {note.important ? 'important' : ''}</strong>
//   </li>
// );

// const Notes = () => {
//   const dispatch = useDispatch();
//   const notesToShow = useSelector(({ filter, notes }) => {
//     if (filter === 'ALL') {
//       return notes;
//     }
//     return filter === 'IMPORTANT'
//       ? notes.filter((note) => note.important)
//       : notes.filter((note) => !note.important);
//   });

//   return (
//     <ul>
//       {notesToShow.map((note) => (
//         <Note
//           key={note.id}
//           note={note}
//           handleClick={() => dispatch(toggleImportanceOf(note.id))}
//         />
//       ))}
//     </ul>
//   );
// };

// export default Notes;

/* older, more complicated way, using connect to make notes a connected component */
import React from 'react';
import { connect } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducer';

const Note = ({ note, handleClick }) => (
  <li onClick={handleClick}>
    {note.content}
    <strong> {note.important ? 'important' : ''}</strong>
  </li>
);

/* eslint-disable react/destructuring-assignment */
const Notes = (props) => (
  <ul>
    {props.notes.map((note) => (
      <Note
        key={note.id}
        note={note}
        handleClick={() => props.toggleImportanceOf(note.id)}
      />
    ))}
  </ul>
);
/* eslint-enable react/destructuring-assignment */

const mapStateToProps = (state) => {
  if (state.filter === 'ALL') {
    return { notes: state.notes };
  }
  return {
    notes: state.filter === 'IMPORTANT'
      ? state.notes.filter((note) => note.important)
      : state.notes.filter((note) => !note.important),
  };
};

const mapDispatchToProps = {
  toggleImportanceOf,
};

const ConnectedNotes = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notes);

export default ConnectedNotes;
