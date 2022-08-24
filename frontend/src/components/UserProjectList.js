import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectItem = ({ project }) => {
    return (
        <tr>
            <td>
                {project.title}
            </td>
            <td>
                {project.repo_link}
            </td>
            <td>
                {project.users}
            </td>
        </tr>
    )
}

const UserProjectList = ({ projects }) => {
    var { userID } = useParams()
    var filteredProjects = projects.filter((project) => project.users.includes(parseInt(userID, 10)))

    return (
        <table>
            <th>
                Project tittle
            </th>
            <th>
                Repository link
            </th>
            <th>
                Users
            </th>

            {filteredProjects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}

export default UserProjectList