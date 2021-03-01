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
        <h3>Sign Up</h3>
        {error && (
          <p>
            <strong>ERROR: {error.message}</strong>
          </p>
        )}

        <form onSubmit={this.handleSubmit}>
          <div>
            <label> username: </label>
            <input
              type="username"
              name="username"
              placeholder="enter username"
              value={username}
              onChange={handleInput}
            />
          </div>
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
          <button>Sign Up</button>
          <br />
          
        </form>

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

export default Signup;
