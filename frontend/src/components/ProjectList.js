import React from 'react';
import { Link } from 'react-router-dom';

const ProjectItem = ({ project, delete_project }) => {
    return (
        <div>
            <tr>
                <td>{project.title}</td>
                <td>{project.repo_link}</td>
                <td>{project.users}</td>
                <td><button onClick={() => delete_project(project.id)} type='button'>Delete</button></td>
            </tr>
        </div>
    )
}

const ProjectList = ({ projects, delete_project }) => {
    return (
        <div>
            <table>
                <tr>
                    <th>Project tittle</th>
                    <th>Repository link</th>
                    <th>Users</th>
                    <th></th>
                </tr>
                {projects.map((project) => <ProjectItem project={project} delete_project={delete_project} />)}
            </table>
            <li><Link to='/projects/create'>Create</Link></li>
            <li><Link to='/projects/search'>Search</Link></li>

        </div>
    )
}

export default ProjectList