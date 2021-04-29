import React, {Component} from "react";
import "bootswatch/dist/minty/bootstrap.css";
import ReactPlayer from "react-player";

class PreviouslyWatched extends Component {

    constructor(props){
        super(props);
    }

    
        
    render(){

        var watchedVids = [
            {id: 1, link: "https://www.youtube.com/watch?v=sTANio_2E0Q"},
            {id: 2, link: "https://www.youtube.com/watch?v=qULTwquOuT4"},
            {id: 3, link: "https://www.youtube.com/watch?v=ugXQe5hbUAA"},
            {id: 4, link: "https://www.youtube.com/watch?v=GjMSgK5H4ho"},
            {id: 5, link: "https://www.youtube.com/watch?v=A4ViwsLKoSY"},
            {id: 6, link: "https://www.youtube.com/watch?v=hgOOu4fXlCo"},
        ];


        return(

            <div className = "PrevWatched">

<div class="jumbotron">
  



                <div>
                    <h2>Your previously viewed videos</h2>
                </div>

               { watchedVids.map((el) => (
                <div key = {el.id}>
                    <br/>
                   <ReactPlayer url = {el.link} controls = {true} style = {{margin:'auto'}}/>
                   <br/>
                </div>
                
               ))}

               

                    </div>
            </div>


        );
    }





}

export default PreviouslyWatched;