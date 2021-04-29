import React, { useState, useEffect }from 'react'
import ReactTooltip from 'react-tooltip';
import { FaHeart } from "react-icons/fa";

const FavButton = (props) => {

  const text = "Add To Favourties";
  const [favText, setFavText] = useState(text);
  const [render, setRender] = useState(false);
  let heartStyle = { color: "red", fontSize: "1.5em", marginLeft: "10px" };
  
  useEffect(() => {
    
    // setRender(props.isFav);
    const timer = setTimeout(() => {
      
      setFavText(text);
    }, 3000);
    return () => clearTimeout(timer);

  })
  // [props.isFav]
  
  return (

    <div id="videoBar">
      <button className="btn btn-secondary"
        id="fav-add"
        data-tip="Add to favoutites!"
        data-place="bottom"
        data-effect="solid"
        data-delay-show='250'
        onClick={() => setFavText("Added to Favourites")}
        style={{ marginRight: 10 }}
        disabled={ props.isFav }
      > { favText }
        <span className="loveheart">
          <FaHeart style={heartStyle} />
        </span>
      </button>
      <ReactTooltip />
    </div>
  )
}

export default FavButton;