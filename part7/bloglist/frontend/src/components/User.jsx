import { React } from 'react';
import PropTypes from 'prop-types';

const User = ({ name, numBlogs }) => (
  <tr>
    <td>{name}</td>
    <td>{numBlogs}</td>
  </tr>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  numBlogs: PropTypes.number.isRequired,
};

export default User;
