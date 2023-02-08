import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAnecdotes, updateAnecdote, createAnecdote } from './requests';
import { useNotificationDispatch } from './NotificationContext';

import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

const App = () => {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote));

      const message = `anecdote '${newAnecdote.content}' voted`;
      notificationDispatch({ type: 'setNotification', payload: message });
      setTimeout(() => {
        notificationDispatch({ type: 'removeNotification' });
      }, 5000);
    },
    onError: (object) => {
      const message = object.response.data.error;
      notificationDispatch({ type: 'setNotification', payload: message });
      setTimeout(() => {
        notificationDispatch({ type: 'removeNotification' });
      }, 5000);
    },
  });

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData(
        'anecdotes',
        anecdotes.map((a) =>
          a.id === updatedAnecdote.id ? updatedAnecdote : a
        )
      );
    },
  });

  const notificationDispatch = useNotificationDispatch();

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
