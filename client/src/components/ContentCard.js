import React from 'react';
import { Link } from 'react-router-dom';
import './pages.css';

const ContentCard = (props) => {
  return (
  <div className="card text-center"  >
      <div className="overflow">
        <img src={props.imgsrc} alt={ props.imgalt }  style={{height: "420px", width: "100%"}}/>
      </div>
      <div className="card-img-overlay text-light" style={{ paddingTop: "60px" } }>
        <h1 className="card-title">{ props.cardTitle }</h1>
        <p className="card-text text-light">
         { props.cardText }
        </p>
        <Link to={`/${props.choiceName}`} className= "btn btn-primary btn-lg" >Explore</Link>
      </div>
      {/* <div className="text-block">
          <h1 className="display-3 "id="yoga-title">Welcome to BreatheOut</h1>
          <p className="lead" id="yoga-para">This site is about relaxing and switching off - no matter how much time you have. Click below to find out more</p>
        </div> */}
  </div>
  
  

  )};

export default ContentCard;