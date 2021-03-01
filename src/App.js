import React, { Component } from "react";
import "./App.css";
import "bootswatch/dist/minty/bootstrap.css";
import Navbar from "./components/Navbar";
import Firebase from "firebase";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import Homepage from "./components/Homepage";
import YogaChoice from "./components/YogaChoice";
import MeditationChoice from "./components/MeditationChoice";
import MeditationContent from "./components/MeditationContent";
import YogaContent from "./components/YogaContent";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      currentUser: null,
    };
    this.checkUser = this.checkUser.bind(this);
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
  checkUser() {
    if (this.state.currentUser != null) {
      let user = Firebase.auth().currentUser;

      if (user != null) {
        user.providerData.forEach(function (profile) {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
        });
      }
    }
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          {/* <Homepage /> */}
          <div className="container-lg">
            <Switch>
              <Route path="/Login" render={(props) => <Login />} />
              <Route path="/Signup" render={(props) => <Signup />} />
              <Route path="/Logout" render={(props) => <Logout />} />
              <Route path="/Homepage" render={(props) => <Homepage />} />
              <Route path="/YogaChoice" render={(props) => <YogaChoice />} />
              <Route
                path="/MeditationChoice"
                render={(props) => <MeditationChoice />}
              />
              <Route
                path="/MeditationContent"
                render={(props) => <MeditationContent />}
              />
              <Route path="/YogaContent" render={(props) => <YogaContent />} />
            </Switch>
            <button onClick={this.checkUser}>TEST USER</button>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
