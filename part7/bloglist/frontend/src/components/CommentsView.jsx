import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCommentTo } from '../reducers/blogReducer';
import { sendNotification } from '../reducers/notificationReducer';
// import PropTypes from 'prop-types';

const CommentsView = ({ blog }) => {
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const addComment = async (event) => {
    event.preventDefault();

    if (comment === '') {
      dispatch(sendNotification('Cannot submit empty comment', true, 3));
    } else {
      dispatch(addCommentTo(blog.id, comment));
      dispatch(sendNotification('Comment added', false, 5));
      setComment('');
    }
  };

  return (
    <>
      <h2>comments</h2>
      <form onSubmit={addComment}>
        <input
          type="text"
          value={comment}
          name="Comment"
          onChange={({ target }) => setComment(target.value)}
          id="comment-input"
        />
        <button id="submit-comment" type="submit">
          add comment
        </button>
      </form>
      <ul>{!blog.comments ? null : blog.comments.map((c) => <li>{c}</li>)}</ul>
    </>
  );
};

// UserView.propTypes = {
//   blogs: PropTypes.shape({
//     author: PropTypes.string.isRequired,
//     blogs: PropTypes.number.isRequired,
//   }).isRequired,
// };

export default CommentsView;
