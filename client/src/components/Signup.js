import React, { Component } from "react";
import Firebase from "../firebase/firebaseIndex";
import "firebase/database";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      username: "",
      error: null,
      profileData: [],
      submitted: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      this.getDataFromDatabase();
    } catch (error) {
      console.log(error);
      this.setState({ error: error });
    }
  }

  getDataFromDatabase() {
    // download and create json array of profile data
    let ref1 = Firebase.database().ref("profiles");

    ref1.on("value", (snapshot) => {
      // json array
      let msgData = snapshot.val();
      let newMessagesFromDB = [];
      for (let m in msgData) {
        // create a json object of our object
        let currObject = {
          email: msgData[m].email,
          id: msgData[m].id,
          name: msgData[m].name,
        };
        // add it to the local array
        newMessagesFromDB.push(currObject);
      } // end of for loop
      // set state
      this.setState({ profileData: newMessagesFromDB });
    });
  }

  insertUser = async () => {
    // this is probably wrong!!?? no preventdefault??
    try {
      const email = this.state.email;
      const username = this.state.username;
      const body = { email, username };
      console.log(body);
      const response = await fetch("http://localhost:5000/SignUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      //console.log(response);
      const jsonData = await response.json();
      console.log(jsonData);
      // set local storage details for logged in user
      localStorage.setItem("userEmail", jsonData[0].email);
      localStorage.setItem("userId", jsonData[0].id);
      localStorage.setItem("photoUrl", "http://via.placeholder.com/50");
    } catch (err) {
      console.error(err.message);
    }
  };

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    // submit to create new user
    event.preventDefault();
    const { email, password, username } = this.state;
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("User account created");
        // add the new user to the database
        this.insertUser();
        this.setState({
          submitted: true,
        });
      })
      .catch((error) => {
        this.setState({ error: error });
      });

    let user = Firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: username,
      })
      .then((user) => {
        console.log("username updated");
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  }

  render() {
    const { email, password, username, error } = this.state;
    const handleInput = this.handleInputChange;

    return (
      <div className="container">
        <legend>Sign Up</legend>
        {error && (
          <p>
            <strong>ERROR: {error.message}</strong>
          </p>
        )}

        {!this.state.submitted && (
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <div className="form-group row">
                <label for="username">Username</label>
                <input
                  className="form-control"
                  type="username"
                  name="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={handleInput}
                />
              </div>
              <div className="form-group row">
                <label for="email">Email Address</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleInput}
                />
              </div>
              <div className="form-group row">
                <label for="password">Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handleInput}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </fieldset>

            <br />
          </form>
        )}
        {this.state.submitted && (
          <div className="alert alert-dismissible alert-success">
            <button type="button" className="close" data-dismiss="alert">
              &times;
            </button>
            <strong>Well done!</strong> You successfully signed up! {" "}
            <a href="/Homepage" className="alert-link">
              click here to go to the Home page
            </a>
            .
          </div>
        )}
      </div>
    );
  }
}

export default Signup;
