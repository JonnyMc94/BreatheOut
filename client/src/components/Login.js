import React, { Component } from "react";
import Firebase from "../firebase/firebaseIndex";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: null,
      submitted: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    // when user submits, it takes the state email and password
    // and sends them to firebase auth and signin functions
    event.preventDefault();
    const { email, password } = this.state;
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // successful login, set state in Parent
        // caught by firebase auth change in app.js
        console.log("user logged in");
        // update user details in database
        this.updateUser();
        this.setState({ submitted: true });
      })
      .catch((error) => {
        // error, push to error state
        this.setState({ error: error });
      });
  }

  updateUser = async () => {
    // this is probably wrong!!?? no preventdefault??
    try {
      const email = this.state.email;
      //const username = this.state.username;
      const body = { email };
      //console.log(body);
      const response = await fetch("http://localhost:5000/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      //console.log(response);
      const jsonData = await response.json();
      console.log(jsonData);
      // store logged in local user
      localStorage.setItem("userEmail", jsonData[0].email);
      localStorage.setItem("userId", jsonData[0].id);
      localStorage.setItem("photoUrl", jsonData[0].photo_url);
    } catch (err) {
      console.error(err.message);
    }
  };

  render() {
    const { email, password, error } = this.state;

    const handleInput = this.handleInputChange;

    return (
      <div className="container">
        {!this.state.submitted && (
          <form onSubmit={this.handleSubmit}>
            <legend>Sign In</legend>
            {error && (
              <p>
                <strong>ERROR: {error.message}</strong>
              </p>
            )}
            <fieldset>
              <div className="form-group row">
                <label htmlFor="email">Email Address</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={handleInput}
                />
              </div>
              <div className="form-group row">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handleInput}
                />
              </div>
              <br />
              <button className="btn btn-primary" type="submit">
                Log In
              </button>
            </fieldset>
            <fieldset>
              <div>
                <br />
                <p>
                  Not signed up? Create an account{" "}
                  <Link to="/Signup">
                    <b>here</b>
                  </Link>
                </p>
              </div>
            </fieldset>
          </form>
        )}

        {this.state.submitted && (
          <div class="alert alert-dismissible alert-success">
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
            <strong>Well done!</strong> You successfully logged in!{" "}
            <a href="/Homepage" class="alert-link">
              click here to go to the Home page
            </a>
            .
          </div>
        )}
      </div>
    );
  }
}

export default Login;
