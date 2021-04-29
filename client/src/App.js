import React, { Component } from "react";
import "./App.css";
import "bootswatch/dist/minty/bootstrap.css";
import Navbar from "./components/Navbar";
import firebase, { storage } from "./firebase/firebaseIndex";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import PreviouslyWatched from "./components/PreviouslyWatched";
import MyAchievements from "./components/MyAchievements";
import MyWatchList from "./components/MyWatchList";
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
      photo: null,
      photoUrl: null,
    };
    this.checkUser = this.checkUser.bind(this);
  }
  // check if user is authenticated,
  // if they are then set to true, otherwise false
  // currentUser holds the user object when logged in
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      user
        ? this.setState(() => ({
            authenticated: true,
            currentUser: user,
            photoUrl: localStorage.getItem("photoUrl")
          }))
        : this.setState(() => ({
            authenticated: false,
            currentUser: null,
          }));
    });
    //this.getImage();
  }
  checkUser() {
    if (this.state.currentUser != null) {
      let user = firebase.auth().currentUser;

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

  // pulls the user's profile photo from firebase and stores it in state. pass to navbar and profile
  /* getImage = async () => {
    let userId = localStorage.getItem("userId");
    let imgName = "test_image"
    if (userId !== "" || userId !== null) {
      imgName = userId;
    }
    // storage is imported from firebase
    // fix below to work when no image exists
    const url = await storage.ref("images").child(`${imgName}.jpg`).getDownloadURL();
    //console.log(url);
    this.setState({ imageUrl: url });
  }
 */

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar/>
          {/* <Homepage /> */}
          <div>
            <Switch>
              <Route path="/Profile" render={(props) => <Profile imageUrl={this.state.imageUrl} />} />
              <Route
                path="/PreviouslyWatched"
                render={(props) => <PreviouslyWatched />}
              />
              <Route
                path="/MyAchievements"
                render={(props) => <MyAchievements />}
              />
              <Route path="/MyWatchList" render={(props) => <MyWatchList />} />
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
              <Route exact path="/" render={(props) => <Login />} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
