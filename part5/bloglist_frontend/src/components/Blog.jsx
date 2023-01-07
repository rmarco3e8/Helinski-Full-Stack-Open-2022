import { React, useState } from 'react';

const Blog = ({
  blog,
  updateBlog,
  removeBlog,
  loggedUser,
}) => {
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
    display: (loggedUser === blog.user.username)
      ? ''
      : 'none',
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const addLike = () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    updateBlog(blog.id, newBlog);
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
    <div style={blogStyle}>
      <div>
        {`${blog.title} ${blog.author}`}
        &nbsp;
        <button type="button" onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showInfoWhenVisible}>
        <div>{blog.url}</div>
        <div>
          {`likes ${blog.likes}`}
          &nbsp;
          <button type="button" onClick={addLike}>like</button>
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

export default Blog;
