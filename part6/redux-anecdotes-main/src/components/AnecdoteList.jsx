import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVoteTo } from '../reducers/anecdoteReducer';
import { sendNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, handleClick }) => (
  <div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button type="button" onClick={handleClick}>vote</button>
    </div>
  </div>
);

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  /* eslint-disable */
  const filteredAnecdotes = anecdotes.filter((a) => a.content.toLowerCase().includes(filter));
  const sortedAnecdotes = structuredClone(filteredAnecdotes).sort((a1, a2) => a2.votes - a1.votes);

  const addVote = (anecdote) => {
    dispatch(addVoteTo(anecdote));
    dispatch(sendNotification(`you voted '${anecdote.content}'`, 5));
  };

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => addVote(anecdote)}
        />
      ))}
    </>
  );
};

export default AnecdoteList;
