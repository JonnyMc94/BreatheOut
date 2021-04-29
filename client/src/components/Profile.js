import React, { Component } from "react";
import "bootswatch/dist/minty/bootstrap.css";
import profilephoto from "../assets/profilephoto.jpg";
import { storage } from "../firebase/firebaseIndex";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      name: "user123456789",
      username: "",
      userPicture: null,
      bio:
        "I have been practicing yoga for 5 years. I come from Ireland. I'm particularly interested in learning and practicing hot yoga. I'm also very interested in mindfulness, meditation and breathing exercises. I am a big fan of Wim Hof and I practice his method every day. I hope to meet some like minded people on this app.",
      editingProfile: false,
      usernameInput: "",
      bioInput: "",
      picture: null,
      pictureBin: null,
      photoUrl: "",
      image: null,
    };
    this.handleProfileButtonClick = this.handleProfileButtonClick.bind(this);
    this.handleFinishButtonClick = this.handleFinishButtonClick.bind(this);
    this.handleUsernameInputChange = this.handleUsernameInputChange.bind(this);
    this.handleNameInputButtonClick = this.handleNameInputButtonClick.bind(
      this
    );
    this.handleBioInputChange = this.handleBioInputChange.bind(this);
    this.handleBioInputButtonClick = this.handleBioInputButtonClick.bind(this);
    this.handlePictureChange = this.handlePictureChange.bind(this);
    this.handlePictureUploadButtonClick = this.handlePictureUploadButtonClick.bind(
      this
    );
  }

  componentDidMount() {
    this.getProfile();
    this.getImageFromProps();
  }

  getProfile = async () => {
    try {
      const id = localStorage.getItem("userId");
      console.log(id);
      this.setState({ userId: id });
      const response = await fetch(`http://localhost:5000/Profile/${id}`, {
        method: "GET",
      });

      // results from database in JSON
      const jsonData = await response.json();
      console.log(jsonData);

      // add these to state
      this.setState({
        name: jsonData[0].name,
        bio: jsonData[0].bio,
        photoUrl: jsonData[0].photo_url,
        username: jsonData[0].username,
      });
    } catch (err) {
      console.error(err);
    }
  };

  getImageFromProps() {
    this.setState({ photoUrl: this.props.imageUrl });
  }

  updateProfile = async () => {
    try {
      const id = localStorage.getItem("userId");
      const name = this.state.name;
      const username = this.state.username;
      const bio = this.state.bio;
      const photoUrl = this.state.photoUrl;

      const body = { name, username, bio, photoUrl };
      const response = await fetch(`http://localhost:5000/Profile/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const jsonData = await response.json();
      console.log(jsonData);

      // store image in local storage
      localStorage.setItem("photoUrl", photoUrl);
    } catch (err) {
      console.error(err);
    }
  };

  // upload the user photo to firebase and retrieve the url
  handleUpload = () => {
    const image = this.state.image;
    console.log(image);

    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({ photoUrl: url });
            //console.log("photoUrl: ", this.state.photoUrl)
          });

      }
    );

    // new image url in state, update the database with it?

  };

  handleProfileButtonClick() {
    this.setState({ editingProfile: true });
  }

  handleFinishButtonClick() {
    this.setState({ editingProfile: false });
    // post the updates to the database here
    this.updateProfile();
  }

  handleUsernameInputChange(event) {
    this.setState({ usernameInput: event.target.value });
  }

  handleNameInputButtonClick() {
    this.setState({ username: this.state.usernameInput });
  }

  handleBioInputChange(event) {
    this.setState({ bioInput: event.target.value });
  }

  handleBioInputButtonClick() {
    this.setState({ bio: this.state.bioInput });
  }

  handlePictureChange(event) {
    if (event.target.files[0]) {
      let image = event.target.files[0];
      //image.name = `${localStorage.getItem("userId")}.jpg`;
      this.setState({
        //picture: URL.createObjectURL(event.target.files[0]),
        picture: image,
        image: image,
      });
      console.log("picture");
      console.log(URL.createObjectURL(event.target.files[0]));
      console.log("image", image);
    }
  }

  handlePictureUploadButtonClick() {
    this.setState({ userPicture: this.state.picture });
    this.handleUpload();
  }

  render() {
    const handleUsernameInput = this.handleUsernameInputChange;
    const handleBioInput = this.handleBioInputChange;
    //console.log("props: ", this.props.imageUrl);
    //console.log("state: ", this.state.photoUrl);
    return (
      <div className="Profile">
        <div className="jumbotron">
          <img
            src={
              /* There is surely a better way to do this */
              this.state.photoUrl || this.props.imageUrl || profilephoto
            }
            style={{ height: 200, borderRadius: 100 }}
            alt="userPic"
          ></img>

          <h1 className="display-3">Namaste...</h1>
          <p className="lead">Name: {this.state.name}</p>
          <p className="lead">Username: {this.state.username}</p>
          <p className="lead">Bio: {this.state.bio}</p>

          <p className="lead">
            <button
              className="btn btn-primary btn-lg"
              href="#"
              onClick={this.handleProfileButtonClick}
            >
              edit profile
            </button>
          </p>

          {this.state.editingProfile === true && (
            <div>
              <br />
              <br />

              <span>
                Edit Username{" "}
                <form>
                  <input type="text" onChange={handleUsernameInput}></input>
                </form>
              </span>
              <br />

              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleNameInputButtonClick}
              >
                Save Userame
              </button>
              <br />
              <br />
              <br />
              <div className="form-group">
                <label htmlFor="exampleTextarea">Edit Bio</label>
                <textarea
                  className="form-control"
                  id="exampleTextarea"
                  rows="3"
                  onChange={handleBioInput}
                ></textarea>
              </div>
              <br />
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleBioInputButtonClick}
              >
                Save Bio
              </button>
              <br />
              <br />
              <br />

              <div className="form-group">
                <label htmlFor="exampleInputFile">Edit Profile picture</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="exampleInputFile"
                  aria-describedby="fileHelp"
                  onChange={this.handlePictureChange}
                ></input>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.handlePictureUploadButtonClick}
                >
                  upload picture
                </button>
                <small id="fileHelp" className="form-text text-muted">
                  Choose a picture to upload
                </small>
                <img
                  src={this.state.picture}
                  style={{ height: 200 }}
                  alt="pic"
                />
              </div>

              <br />
              <br />
              <br />

              <button
                className="btn btn-primary btn-lg"
                href="#"
                onClick={this.handleFinishButtonClick}
              >
                Finsihed Editing
              </button>
            </div>
          )}
        </div>

        <div
          className="card text-white bg-primary mb-3"
          style={{ maxwidth: "20 rem" }}
        >
          <div className="card-header">Previously watched content</div>
          <div className="card-body">
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "white", color: "#56cc9d" }}
            >
              <a href="/PreviouslyWatched">Watch again</a>
            </button>
            <br />
            <br />
            <p className="card-text">
              Did you like a video you've seen before? Click here to view your
              previously viewed content
            </p>
          </div>
        </div>

        <div
          className="card text-white bg-primary mb-3"
          style={{ maxwidth: "20 rem" }}
        >
          <div className="card-header">My Watchlist</div>
          <div className="card-body">
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "white", color: "#56cc9d" }}
            >
              <a href="/MyWatchList">Saved content</a>
            </button>
            <br />
            <br />
            <p className="card-text">
              Click here to inspect your list of saved content
            </p>
          </div>
        </div>

        <div
          className="card text-white bg-primary mb-3"
          style={{ maxwidth: "20 rem" }}
        >
          <div className="card-header">My Achievements</div>
          <div className="card-body">
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "white", color: "#56cc9d" }}
            >
              <a href="/MyAchievements">Achievements</a>
            </button>
            <br />
            <br />
            <p className="card-text">
              Check your progress here, what milestones have you passed and
              what's coming up
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
