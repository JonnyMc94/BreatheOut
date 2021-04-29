import React, { Component } from "react";
import { Link } from "react-router-dom";
//import { FaUser } from "react-icons/fa";
import profilephoto from "../assets/profilephoto.jpg";
import "bootswatch/dist/minty/bootstrap.css";

export default class Navbar extends Component {
  render() {
    //let userStyle = { color: "white", fontSize: "1.5em", marginLeft: "10px" };
    let photoUrl = localStorage.getItem("photoUrl");
    

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-3">
        <Link to="/Homepage" className="navbar-brand">
          BreatheOut
        </Link>
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
            <li className="nav-item">
              <a className="nav-link" href="/Login">
                Login
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
          </ul>
        </div>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/profile">
                Profile {/*<span><FaUser style={ userStyle }/></span>*/}
                <img
                  src={photoUrl || profilephoto} 
                  style={{ height: 100, borderRadius: 10 }}
                  alt="userPhoto"
                ></img>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
