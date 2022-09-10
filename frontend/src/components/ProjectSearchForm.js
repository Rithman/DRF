import React from "react";


class ProjectSearchForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { "search": "" }
    }


    ProjectItem = ({ project, delete_project }) => {
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

    handleChange(event) {
        this.setState({
            "search": String(event.target.value)
        })
    }

    filterProjects() {
        let result = this.props.projects.filter((project) => project.title.toLowerCase().includes(this.state.search.toLowerCase()))
        return result
    }

    render() {
        return (
            <div>
                <table>
                    <tr>
                        <th>Project tittle</th>
                        <th>Repository link</th>
                        <th>Users</th>
                        <th></th>
                    </tr>
                    {this.filterProjects().map((project) => <this.ProjectItem project={project} delete_project={this.props.delete_project} />)}
                </table>

                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="form-group">
                        <label for="search">Search by project title</label>
                        <input type="text" className="form-control" name="title" onChange={(event) => this.handleChange(event)} />
                    </div>
                </form>
            </div>
        );
    }
}
export default ProjectSearchForm