import React, { useState, useEffect }from 'react'
import ReactTooltip from 'react-tooltip';
import { FaEye } from "react-icons/fa";

const WatchButton = (props) => {

  const text = "Add To Watchlist";
  const [watchText, setWatchText] = useState(text);
  const [render, setRender] = useState(false);
  let eyeStyle = { color: "blue", fontSize: "1.5em", marginLeft: "10px"};
  
  useEffect(() => {
    
    // setRender(props.isWatch);

    const timer = setTimeout(() => {
      setWatchText(text);
    }, 3000);
    return () => clearTimeout(timer);

     }, ) 
   // [props.isWatch]
  
  return (
    <div>
    <button className="btn btn-primary"
        id="watch-add"
        data-tip="Add to Watchlist!"
        data-place="bottom"
        data-effect="float"
        data-delay-show='250'
        onClick={() => setWatchText("Added to Watchlist")}
      > { watchText }
        <span className="loveheart">
          <FaEye style={eyeStyle} />
        </span>
      </button>
      <ReactTooltip />
    </div>
    
  )
}

export default WatchButton;