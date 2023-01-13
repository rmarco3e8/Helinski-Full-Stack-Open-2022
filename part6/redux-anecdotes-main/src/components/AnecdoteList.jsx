import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVoteTo } from '../reducers/anecdoteReducer';

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
  const anecdotes = useSelector((state) => state);
  const sortedAnecdotes = structuredClone(anecdotes).sort((a1, a2) => a2.votes - a1.votes);

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(addVoteTo(anecdote.id))}
        />
      ))}
    </>
  );
};

export default AnecdoteList;
