import React from "react";


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { title: '', repo_link: '', users: props.users[0].id }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.create_project(this.state.title, this.state.repo_link, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="title">title</label>
                    <input type="text" className="form-control" name="title" value={this.state.title} onChange={(event) => this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label for="repo_link">repo_link</label>

                    <input type="text" className="form-control" name="repo_link" value={this.state.repo_link} onChange={(event) => this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label for="users">users</label>

                    <select multiple name="users" className="form-control" onChange={(event) => this.handleChange(event)} >
                        {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}
                    </select>
                </div>

                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default ProjectForm