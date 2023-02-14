import { React } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const User = ({ user }) => (
  <tr>
    <td>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </td>
    <td>{user.blogs.length}</td>
  </tr>
);

// User.propTypes = {
//   name: PropTypes.string.isRequired,
//   numBlogs: PropTypes.number.isRequired,
// };

export default User;
