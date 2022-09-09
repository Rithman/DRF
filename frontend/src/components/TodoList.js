import React from 'react';
import { Link } from 'react-router-dom';

const TodoItem = ({ todo, delete_todo }) => {
    return (
        <div>
            <tr>
                <td>{todo.user}</td>
                <td>{todo.project}</td>
                <td>{todo.text}</td>
                <td>{todo.is_active}</td>
                <td><button onClick={() => delete_todo(todo.id)} type='button'>Delete</button></td>
            </tr>
        </div>
    )
}

const TodoList = ({ todos, delete_todo }) => {
    let filtered_todos = todos.filter(todo => todo.is_active == 1)
    return (
        <div>
            <table>
                <tr>
                    <th>User</th>
                    <th>Project</th>
                    <th>Text</th>
                    <th>Is active</th>
                    <th></th>
                </tr>
                {filtered_todos.map((todo) => <TodoItem todo={todo} delete_todo={delete_todo} />)}
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}

export default TodoList