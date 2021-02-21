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
      })
      .catch((error) => {
        // error, push to error state
        this.setState({ error: error });
      });
  }

  render() {
    const { email, password, error } = this.state;

    const handleInput = this.handleInputChange;

    return (
      <div className="container">
        <h3>Sign In</h3>
        {error && (
          <p>
            <strong>ERROR: {error.message}</strong>
          </p>
        )}

        <form onSubmit={this.handleSubmit}>
          <div>
            <label> email address: </label>
            <input
              type="email"
              name="email"
              placeholder="enter email"
              value={email}
              onChange={handleInput}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              placeholder="enter password"
              value={password}
              onChange={handleInput}
            />
          </div>
          <button>Log In</button>
        </form>
        <div className="container">
          <p>
            Not signed up? Create an account{" "}
            <Link to="/Signup">
              <b>here</b>
            </Link>
          </p>
        </div>

        {/* <form>
          <fieldset>
            <legend>Log In</legend>
            <p>Please enter your email address and password below to log in.</p>
            <div className="form-group">
              <label htmlFor="email">email address</label>
              <div className="input-group">
                <input
                  className="form-control"
                  type="email"
                  aria-describedby="emailHelp"
                  placeholder="enter email"
                  onChange={handleInput}
                />

                <label htmlFor="password">password</label>
                <input
                  className="form-control"
                  type="password"
                  aria-describedby="passwordHelp"
                  placeholder="enter password"
                  onChange={handleInput}
                />

                <button
                  type="button"
                  className="btn btn-primary"
                  //disabled={!this.state.emailValid}
                  onClick={this.handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </fieldset>
        </form> */}
      </div>
    );
  }
}

export default Login;
