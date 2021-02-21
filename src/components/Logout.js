import React, { Component } from 'react';
import Firebase from "../firebase/firebaseIndex";

class Logout extends Component {
  constructor(props) {
    super(props)
    
    this.logOutUser = this.logOutUser.bind(this);
  }

  logOutUser() {
    // call firebase sign out
    Firebase.auth().signOut();
  }

  render() {
    return (
      <div className="logout">
        <button onClick={this.logOutUser}>Logout</button>
      </div>
    )
  }
}

export default Logout;