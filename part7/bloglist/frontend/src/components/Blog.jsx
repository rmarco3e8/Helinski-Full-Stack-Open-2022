import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addLikeTo } from '../reducers/blogReducer';

const Blog = ({ blog, removeBlog, loggedUser }) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const showInfoWhenVisible = { display: visible ? '' : 'none' };

  const showDeleteButton = {
    display: loggedUser === blog.user.username ? '' : 'none',
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const addLike = async () => {
    dispatch(addLikeTo(blog));
  };

  /* eslint-disable no-alert */
  const deleteBlog = () => {
    const prompt = `Remove blog ${blog.title} by ${blog.author}`;
    if (window.confirm(prompt)) {
      removeBlog(blog.id);
    }
  };
  /* eslint-enable no-alert */

  return (
    <div style={blogStyle} className="blogDiv">
      <div className="blogAlwaysVisible">
        {`${blog.title} ${blog.author}`}
        &nbsp;
        <button type="button" onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showInfoWhenVisible} className="blogTogglableContent">
        <div>{blog.url}</div>
        <div>
          {`likes ${blog.likes}`}
          &nbsp;
          <button type="button" onClick={addLike} className="likeButton">
            like
          </button>
        </div>
        <div>{blog.user.username}</div>
        <div>
          <button style={showDeleteButton} type="button" onClick={deleteBlog}>
            remove
          </button>
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  removeBlog: PropTypes.func.isRequired,
  loggedUser: PropTypes.string.isRequired,
};

export default Blog;
