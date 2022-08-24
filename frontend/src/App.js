import React from 'react';
import ProjectList from './components/ProjectList';
import UserList from './components/UserList';
import UserProjectList from './components/UserProjectList';
import TodoList from "./components/TodoList";
import LoginForm from './components/Auth';
import axios from 'axios';
import { BrowserRouter, Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';


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
      'token': ''
    }
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({ 'token': token }, () => this.load_data())
  }

  is_authenticated() {
    return this.state.token !== ''
  }

  logout() {
    this.set_token('')
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({ 'token': token }, () => this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-auth-token/', {
      username: username,
      password: password
    })
      .then(response => {
        this.set_token(response.data['token'])
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



  componentDidMount() {
    this.get_token_from_storage()

  }

  render() {
    return (

      <div>
        <BrowserRouter>
          <nav>
            <ul>
              <li> <Link to="/users">Users</Link> </li>
              <li> <Link to="/projects">Projects</Link></li>
              <li> <Link to="/todos">Todos</Link> </li>
              {/* <li> <Link to="/login">Login</Link></li> */}
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

            <Route exact path="/projects" element={<ProjectList projects={this.state.projects} />} />
            <Route exact path="/todos" element={<TodoList todos={this.state.todos} />} />
            <Route exact path="/login" element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
            <Route exact path="/" element={<Navigate to="users" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    )
  }
}

const Footer = class Footer extends (React.Component) {
  render() {
    return <div>Funky footer</div>;
  }
};


export default App;

