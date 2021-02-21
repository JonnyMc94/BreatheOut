import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootswatch/dist/minty/bootstrap.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/">
          BreatheOut
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor03"
          aria-controls="navbarColor03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home
                <span className="sr-only">(current)</span>
              </a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
            
          </ul>
        </div>
      </nav>
    );
  }
}
