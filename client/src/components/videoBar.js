import React from 'react';
import FavButton from './favBtn';
import WatchButton from './watchBtn';
 
const VideoBar = (props) => {


  return (

  <div className="videoBtns">
      <FavButton isFav={ props.isFav }/>
      <WatchButton isWatch={ props.isWatch }/>
  </div>    
    
)
  
}

export default VideoBar;
