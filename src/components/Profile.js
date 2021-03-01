import React, {Component} from "react";
import "bootswatch/dist/minty/bootstrap.css";
import profilephoto from '../assets/profilephoto.jpg';
import Firebase from "../firebase/firebaseIndex";

class Profile extends Component{
 
  constructor(props){
    super(props);

    this.state = {
      name:"user123456789",
      userPicture:profilephoto,
      bio: "I have been practicing yoga for 5 years. I come from Ireland. I'm particularly interested in learning and practicing hot yoga. I'm also very interested in mindfulness, meditation and breathing exercises. I am a big fan of Wim Hof and I practice his method every day. I hope to meet some like minded people on this app.",
      editingProfile: false,
      usernameInput:"",
      bioInput:"",
      picture: null

      
    }
   this.handleProfileButtonClick = this.handleProfileButtonClick.bind(this);
   this.handleFinishButtonClick = this.handleFinishButtonClick.bind(this);
   this.handleNameInputChange = this.handleNameInputChange.bind(this);
   this.handleNameInputButtonClick = this.handleNameInputButtonClick.bind(this);
   this.handleBioInputChange = this.handleBioInputChange.bind(this);
   this.handleBioInputButtonClick = this.handleBioInputButtonClick.bind(this);
   this.handlePictureChange = this.handlePictureChange.bind(this);
   this.handlePictureUploadButtonClick = this.handlePictureUploadButtonClick.bind(this);
  }

  handleProfileButtonClick(){
      this.setState({editingProfile:true});
  }

  handleFinishButtonClick(){
    this.setState({editingProfile:false});
}

handleNameInputChange(event) {
    this.setState({ usernameInput: event.target.value });
  }

handleNameInputButtonClick(){
    this.setState({name:this.state.usernameInput});
}

handleBioInputChange(event) {
    this.setState({ bioInput: event.target.value });
  }

  handleBioInputButtonClick(){
    this.setState({bio:this.state.bioInput});
}

handlePictureChange(event) {
    this.setState({
      picture: URL.createObjectURL(event.target.files[0])
    })
  }

  handlePictureUploadButtonClick(){
      this.setState({userPicture:this.state.picture})
  }


  render (){
    const handleNameInput = this.handleNameInputChange;
    const handleBioInput = this.handleBioInputChange;
    return(

      <div classname = "Profile">


<div class="jumbotron">

<img src = {this.state.userPicture} style ={{height:200}}></img>

  <h1 class="display-3">Welcome back</h1>
  <p class="lead">      
        {this.state.name}
  </p>   
  <p class="lead">      
        {this.state.bio}
  </p>
  
  
  <p class="lead">
    <button class="btn btn-primary btn-lg" href="#" role="button" onClick = {this.handleProfileButtonClick}>edit profile</button>
  </p>

        {this.state.editingProfile===true &&
        <div>
        
        <br/>
        <br/> 

    <span>Edit UserName <form><input type = "text" onChange={handleNameInput}></input></form></span> 
    <br/>

    <button type="submit" class="btn btn-primary" onClick = {this.handleNameInputButtonClick}>Save Userame</button>
        <br/>
        <br/>
        <br/>
        <div class="form-group">
      <label for="exampleTextarea">Edit Bio</label>
      <textarea class="form-control" id="exampleTextarea" rows="3" onChange={handleBioInput}></textarea>
    </div> 
        <br/>
        <button type="submit" class="btn btn-primary" onClick = {this.handleBioInputButtonClick}>Save Bio</button>
        <br/>
        <br/>
        <br/>

    <div class="form-group">
      <label for="exampleInputFile">Edit Profile picture</label>
      <input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" onChange={this.handlePictureChange}></input>
      <button type="submit" class="btn btn-primary" onClick = {this.handlePictureUploadButtonClick}>upload picture</button>
      <small id="fileHelp" class="form-text text-muted">Choose a picture to upload</small>
      <img src={this.state.picture} style = {{height:200}}/>
    </div>

        <br/>
        <br/>
        <br/>

        <button class="btn btn-primary btn-lg" href="#" role="button" onClick = {this.handleFinishButtonClick}>Finsihed Editing</button>

        
    </div> 
    }
    </div>

        
        


        
      </div>
    )
  }
}

export default Profile;