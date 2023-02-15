import { React } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addLikeTo, removeBlog } from '../reducers/blogReducer';
// import PropTypes from 'prop-types';

const SingleBlogView = ({ blog, loggedUser }) => {
  if (!blog) {
    return null;
  }

  const showDeleteButton = {
    display: loggedUser === blog.user.username ? '' : 'none',
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addLike = async () => {
    dispatch(addLikeTo(blog));
  };

  /* eslint-disable no-alert */
  const deleteBlog = async () => {
    const prompt = `Remove blog ${blog.title} by ${blog.author}`;
    if (window.confirm(prompt)) {
      dispatch(removeBlog(blog.id));
    }
    navigate('/');
  };
  /* eslint-enable no-alert */

  return (
    <>
      <h1>{`${blog.title} by ${blog.author}`}</h1>
      <div>{blog.url}</div>
      <div>
        {`likes ${blog.likes}`}
        &nbsp;
        <button type="button" onClick={addLike} className="likeButton">
          like
        </button>
      </div>
      <div>{`added by ${blog.user.username}`}</div>
      <div>
        <button style={showDeleteButton} type="button" onClick={deleteBlog}>
          remove
        </button>
      </div>
    </>
  );
};

// UserView.propTypes = {
//   blogs: PropTypes.shape({
//     author: PropTypes.string.isRequired,
//     blogs: PropTypes.number.isRequired,
//   }).isRequired,
// };

export default SingleBlogView;
