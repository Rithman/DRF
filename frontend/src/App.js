import React from 'react';
import ProjectList from './components/ProjectList';
import UserList from './components/UserList';
import UserProjectList from './components/UserProjectList';
import TodoList from "./components/TodoList";
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
      'todos': []
    }
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/projects")
      .then(response => {
        const projects = response.data
        this.setState(
          {
            'projects': projects
          }
        )
      })
      .catch(error => console.log(error))

    axios
      .get("http://127.0.0.1:8000/api/users")
      .then(response => {
        const users = response.data
        this.setState(
          {
            'users': users
          }
        )
      })
      .catch(error => console.log(error))

    axios
      .get("http://127.0.0.1:8000/api/todos")
      .then(response => {
        const todos = response.data
        this.setState(
          {
            'todos': todos
          }
        )
      })
      .catch(error => console.log(error))
  }

  render() {
    return (

      <div>
        <Menu />
        <BrowserRouter>
          <nav>
            <li> <Link to="/users">Users</Link> </li>
            <li> <Link to="/projects">Projects</Link> </li>
            <li> <Link to="/Todos">Todos</Link> </li>
          </nav>
          <Routes>
            <Route path="/users">
              <Route index element={<UserList users={this.state.users} />} />
              <Route path=":userId" element={<UserProjectList projects={this.state.projects} />} />
            </Route>

            <Route exact path="/projects" element={<ProjectList projects={this.state.projects} />} />
            <Route exact path="/todos" element={<TodoList todos={this.state.todos} />} />
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
const Menu = class Menu extends (React.Component) {
  render() {
    return <ul>
      <li><a href="">Пункт меню 1</a></li>
      <li><a href="">Пункт меню 2</a></li>
      <li><a href="">Пункт меню 3</a></li>
    </ul>

  }
};


export default App;

