import React from 'react';

const TodoItem = ({ todo }) => {
    return (
        <tr>
            <td>
                {todo.user}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.text}
            </td>
        </tr>
    )
}

const TodoList = ({ todos }) => {
    return (
        <table>
            <th>
                User
            </th>
            <th>
                Project
            </th>
            <th>
                Text
            </th>
            {todos.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}

export default TodoList