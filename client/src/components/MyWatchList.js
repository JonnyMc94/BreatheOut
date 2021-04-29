import React, {Component} from "react";
import "bootswatch/dist/minty/bootstrap.css";
import ReactPlayer from "react-player";

class MyWatchList extends Component {

    constructor(props){
        super(props);
    }
        
    render(){

        var watchList = [
            {id: 1, link: "https://www.youtube.com/watch?v=T1ShcDLdJ_c"},
            {id: 2, link: "https://www.youtube.com/watch?v=ZToicYcHIOU"},
            {id: 3, link: "https://www.youtube.com/watch?v=acUZdGd_3Dg"},
            {id: 4, link: "https://www.youtube.com/watch?v=hJbRpHZr_d0"},
            {id: 5, link: "https://www.youtube.com/watch?v=xe3D7vKvtok"},
            {id: 6, link: "https://www.youtube.com/watch?v=r7xsYgTeM2Q"},
        ];

        return(

            <div classname = "watchList">

        <div class="jumbotron">
        



        <div>
            <h2>My WatchList</h2>
        </div>

        { watchList.map((el) => (
        <div key = {el.id}>
            <br/>
            <ReactPlayer url = {el.link} controls = {true} style = {{margin:'auto'}}/>
            <br/>
        </div>
        
        ))}

        

            </div>
        </div>
            

           


        )
    }





}

export default MyWatchList;