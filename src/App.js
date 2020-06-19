import React, { Component } from "react";
import Todos from "./components/Todos";
import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    todos: [
      // {
      //   id: uuidv4(),
      //   title: "Take out the trash",
      //   completed: false,
      // },
      // {
      //   id: uuidv4(),
      //   title: "Dinner with wife",
      //   completed: false,
      // },
      // {
      //   id: uuidv4(),
      //   title: "Meeting with boss",
      //   completed: false,
      // },
    ],
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((response) => this.setState({ todos: response.data }));
  }

  //Mark todo as completed
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  // Add todo
  addTodo = (title) => {
    // fetch("https://jsonplaceholder.typicode.com/todos", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     title: title,
    //     completed: false,
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((jsonResponse) => {
    //     console.log(jsonResponse);
    //     this.setState({ todos: [...this.state.todos, jsonResponse] });
    //   });
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: title, //or simply title since it is the same
        completed: false,
      })
      .then((response) =>
        this.setState({ todos: [...this.state.todos, response.data] })
      );
  };

  //Delete todo
  delTodo = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response) =>
        this.setState({
          todos: [...this.state.todos.filter((todo) => todo.id !== id)],
        })
      );
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
