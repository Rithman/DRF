import React from 'react';

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

const ProjectList = ({ projects }) => {
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

            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}

export default ProjectList