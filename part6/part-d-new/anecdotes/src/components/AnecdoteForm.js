import { useNotificationDispatch } from '../NotificationContext';

const AnecdoteForm = ({ newAnecdoteMutation }) => {
  const notificationDispatch = useNotificationDispatch();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes: 0 });

    const message = `anecdote '${content}' created`;
    notificationDispatch({ type: 'setNotification', payload: message });
    setTimeout(() => {
      notificationDispatch({ type: 'removeNotification' });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
