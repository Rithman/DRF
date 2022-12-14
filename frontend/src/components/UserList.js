import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = ({ user }) => {
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                <Link to={`/users/${user.id}`}>{user.last_name}</Link>
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({ users }) => {
    return (
        <table>
            <th>
                Username
            </th>
            <th>
                First name
            </th>
            <th>
                Last name
            </th>
            <th>
                email
            </th>
            {users.map((user) => <UserItem user={user} />)}
        </table>
    )
}



export default UserList