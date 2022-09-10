import React from 'react';
import ProjectList from './components/ProjectList';
import UserList from './components/UserList';
import UserProjectList from './components/UserProjectList';
import TodoList from "./components/TodoList";
import LoginForm from './components/Auth';
import ProjectForm from './components/ProjectForm';
import TODOForm from './components/TODOForm';
import ProjectSearchForm from './components/ProjectSearchForm';
import axios from 'axios';
import { BrowserRouter, Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';


const NotFound = () => {
  var { pathname } = useLocation()

  return (
    <div>
      Page "{pathname}" not found!
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      'projects': [],
      'users': [],
      'todos': [],
      'token': '',
      'current_user': ''
    }
  }

  set_token(token) {
    localStorage.setItem("token", token)
    this.setState({ "token": token }, () => this.load_data())
  }

  is_authenticated() {
    return !!this.state.token
  }

  logout() {
    this.set_token('')
  }

  get_token_from_storage() {
    let token = localStorage.getItem("token")
    this.setState({ 'token': token }, () => this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {
      username: username,
      password: password
    })
      .then(response => {
        this.set_token(response.data['token'])
        this.get_current_user()
      }).catch(error => alert('Неверный логин или пароль'))
  }


  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.is_authenticated()) {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }


  load_data() {
    const headers = this.get_headers()
    axios.get("http://127.0.0.1:8000/api/projects", { headers })
      .then(response => {
        this.setState({ projects: response.data })
      })
      .catch(error => {
        console.log(error)
        this.setState({ projects: [] })
      })

    axios
      .get("http://127.0.0.1:8000/api/users", { headers })
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch(error => {
        console.log(error)
        this.setState({ users: [] })
      })

    axios
      .get("http://127.0.0.1:8000/api/todos", { headers })
      .then(response => {
        this.setState({ todos: response.data })
      })
      .catch(error => {
        console.log(error)
        this.setState({ todos: [] })
      })
  }

  get_current_user() {
    let headers = this.get_headers()
    axios.get("http://127.0.0.1:8000/api-current-user/", { headers })
      .then(response => {
        this.setState({ 'current_user': response.data['username'] })
      })
  }

  show_current_user() {
    if (this.is_authenticated()) {
      if (this.state.current_user === "") {
        this.get_current_user();
      }
      return `Вы авторизованы как: ${this.state.current_user}`;
    } else {
      return `Вы не авторизованы`
    }
  }

  delete_project(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, { headers })
      .then(response => {
        this.setState({ projects: this.state.projects.filter((item) => item.id !== id) })
      }).catch(error => console.log(error))
  }

  create_project(title, repo_link, users) {
    const headers = this.get_headers()
    const data = { title: title, repo_link: repo_link, users: [parseInt(users, 10)] }
    axios.post('http://127.0.0.1:8000/api/projects/', data, { headers })
      .then(response => {
        let new_project = response.data
        const users = this.state.users.filter((item) => item.id === new_project.users)[0]
        new_project.users = users
        this.setState({ projects: [...this.state.projects, new_project] })
      }).catch(error => console.log(error))
  }

  delete_todo(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, { headers })
      .then(response => {
        this.setState({ todos: this.state.todos.filter((item) => item.id !== id) })
      }).catch(error => console.log(error))
  }

  create_todo(text, project, user) {
    const headers = this.get_headers()
    const data = { text: text, project: project, user: parseInt(user, 10) }
    axios.post('http://127.0.0.1:8000/api/todos/', data, { headers })
      .then(response => {
        let new_todo = response.data
        const user = this.state.users.filter((item) => item.id === new_todo.user)[0]
        new_todo.user = user
        const project = this.state.projects.filter((item) => item.id == new_todo.project)[0]
        new_todo.project = project
        this.setState({ todos: [...this.state.todos, new_todo] })
      }).catch(error => console.log(error))
  }

  componentDidMount() {
    this.get_token_from_storage()
  }


  render() {
    return (

      <div className='"App'>
        <div>
          {this.show_current_user()}
        </div>
        <BrowserRouter>
          <nav>
            <ul>
              <li> <Link to="/users">Users</Link> </li>
              <li> <Link to="/projects">Projects</Link></li>
              <li> <Link to="/todos">Todos</Link> </li>
              <li>
                {this.is_authenticated() ? <button onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/users">
              <Route index element={<UserList users={this.state.users} />} />
              <Route path=":userId" element={<UserProjectList projects={this.state.projects} />} />
            </Route>

            <Route exact path='/projects/search' element={
              <ProjectSearchForm projects={this.state.projects} delete_project={(id) => this.delete_project(id)} />
            } />


            <Route exact path='/projects/create' element={
              <ProjectForm users={this.state.users} create_project={
                (title, repo_link, users) => this.create_project(title, repo_link, users)} />
            } />

            <Route exact path="/projects" element={<ProjectList projects={this.state.projects} delete_project={(id) => this.delete_project(id)} />} />

            <Route exact path='/todos/create' element={
              <TODOForm user={this.state.users} project={this.state.projects} create_todo={
                (text, project, user) => this.create_todo(text, project, user)} />
            } />

            <Route exact path="/todos" element={<TodoList todos={this.state.todos} delete_todo={(id) => this.delete_todo(id)} />} />


            <Route exact path="/login" element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
            <Route exact path="/" element={<Navigate to="users" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div >
    )
  }
}

const Footer = class Footer extends (React.Component) {
  render() {
    return <div>Funky footer</div>;
  }
};


export default App;
