import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import User from './User';

const UsersView = ({ blogs }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setUserList(
      blogs.reduce((users, blog) => {
        const { user } = blog;
        if (!users.find((userEntry) => userEntry.user.id === user.id)) {
          return users.concat({ user, blogs: 1 });
        }
        return users.map((userEntry) =>
          userEntry.user.id !== blog.user.id
            ? userEntry
            : { ...userEntry, blogs: userEntry.blogs + 1 }
        );
      }, [])
    );
  }, [blogs]);

  return (
    <>
      <h1>blogs</h1>
      <table>
        <tr>
          <th>{}</th>
          <th>blogs created</th>
        </tr>
        {userList.map((userEntry) => (
          <User
            key={userEntry.user.id}
            name={userEntry.user.name}
            numBlogs={userEntry.blogs}
          />
        ))}
      </table>
    </>
  );
};

UsersView.propTypes = {
  blogs: PropTypes.shape({
    author: PropTypes.string.isRequired,
    blogs: PropTypes.number.isRequired,
  }).isRequired,
};

export default UsersView;
