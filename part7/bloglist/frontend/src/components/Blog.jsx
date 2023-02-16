import { React } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => (
  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5,
  // };

  // <div style={blogStyle} className="blogDiv">
  <div className="blogDiv">
    <Link to={`/blogs/${blog.id}`}>{`${blog.title} by ${blog.author}`}</Link>
  </div>
);

// Blog.propTypes = {
//   blog: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     author: PropTypes.string.isRequired,
//     url: PropTypes.string.isRequired,
//     likes: PropTypes.number,
//     user: PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       username: PropTypes.string.isRequired,
//     }).isRequired,
//   }).isRequired,
//   loggedUser: PropTypes.string.isRequired,
// };

export default Blog;
