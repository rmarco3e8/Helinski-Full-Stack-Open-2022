import { React } from 'react';
// import PropTypes from 'prop-types';

const SingleUserView = ({ user }) => (
  <>
    <h1>{user.name}</h1>
    <h2>added blogs</h2>
    <ul>
      {user.blogs.map((b) => (
        <li>{b.title}</li>
      ))}
    </ul>
  </>
);

// UserView.propTypes = {
//   blogs: PropTypes.shape({
//     author: PropTypes.string.isRequired,
//     blogs: PropTypes.number.isRequired,
//   }).isRequired,
// };

export default SingleUserView;
