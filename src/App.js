import React, { Component } from "react";
import "./App.css";
import "bootswatch/dist/minty/bootstrap.css";
import Navbar from "./components/Navbar";
import Firebase from "./firebase/firebaseIndex";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import Homepage from './components/Homepage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      currentUser: null,
    };
  }

  // check if user is authenticated,
  // if they are then set to true, otherwise false
  // currentUser holds the user object when logged in
  componentDidMount() {
    Firebase.auth().onAuthStateChanged((user) => {
      user
        ? this.setState(() => ({
            authenticated: true,
            currentUser: user,
          }))
        : this.setState(() => ({
            authenticated: false,
            currentUser: null,
          }));
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container-lg">
          <Switch>
            <Route path="/Login" render={(props) => <Login />} />
            <Route path="/Signup" render={(props) => <Signup />} />
            <Route path="/Logout" render={(props) => <Logout />} />
            <Route path="/Homepage" render={(props) => <Homepage />} />
          </Switch>

          {this.state.currentUser !== null && (
            <i>Logged in as: {this.state.currentUser.email}</i>
          )}
          {this.state.authenticated && <b>authenticated</b>}
        </div>
      </div>
    );
  }
}

export default App;
