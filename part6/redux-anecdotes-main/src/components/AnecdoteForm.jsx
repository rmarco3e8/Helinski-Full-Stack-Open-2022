import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { sendNotification } from '../reducers/notificationReducer';

/* eslint-disable react/destructuring-assignment */
const AnecdoteForm = (props) => {
  /* eslint-disable no-param-reassign */
  const addAnecdote = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    props.createAnecdote(content);

    props.sendNotification(`you added '${content}'`, 5);
  };
  /* eslint-enable no-param-reassign */

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </>
  );
};
/* eslint-enable react/destructuring-assignment */

export default connect(
  null,
  { createAnecdote, sendNotification },
)(AnecdoteForm);
