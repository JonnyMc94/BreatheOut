import React from 'react';
// import YouTube from 'react-youtube';
import ReactPlayer from 'react-player'

import { useSelector } from 'react-redux';

const YoutubePlayer = (props) => {

  const videoOnReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const opts = {
      height: '400',
      width: '680',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      origin: 'http://localhost:3000' 
      },
    };

  //let videoID  = useSelector(state => state.urlReducer);
  //const videoID = "uBrSRnK_hIg"
  let videoID = props.videoId;
  return (

    // <YouTube videoid={videoID} opts={opts} onReady={videoOnReady} />
    <div className="container" >
      
      <ReactPlayer url={videoID} controls={true} width="66rem" height="25rem" style={{ margin: 'auto', marginTop: 20, marginBottom: 20}} />
     
      
    </div>
    
  )

  
}

export default YoutubePlayer