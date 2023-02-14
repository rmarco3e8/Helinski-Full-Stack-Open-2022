import { React } from 'react';
import User from './User';

const UsersView = ({ users }) => (
  <>
    <h1>blogs</h1>
    <table>
      <tr>
        <th>{}</th>
        <th>blogs created</th>
      </tr>
      {users.map((u) => (
        <User key={u.id} user={u} />
      ))}
    </table>
  </>
);

export default UsersView;
