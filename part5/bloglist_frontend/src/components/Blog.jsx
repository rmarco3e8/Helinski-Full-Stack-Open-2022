import { React, useState } from 'react';

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle}>
      <div>
        {`${blog.title} ${blog.author}`}
        &nbsp;
        <button type="button" onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          {`likes ${blog.likes}`}
          &nbsp;
          <button type="button">like</button>
        </div>
        <div>{blog.user.username}</div>
      </div>
    </div>
  );
};

export default Blog;
