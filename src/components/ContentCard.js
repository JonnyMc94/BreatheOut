import React from 'react';
import './components.css'

const ContentCard = (props) => {
  return (
  <div className="card text-center"  >
      <div className="overflow">
        <img src={props.imgsrc} alt={ props.imgalt }  style={{height: "400px", width: "100%"}}/>
      </div>
      <div className="card-img-overlay text-light" style={{ paddingTop: "60px" } }>
        <h1 className="card-title">{ props.cardTitle }</h1>
        <p className="card-text text-light">
         { props.cardText }
        </p>
        <a href="#" className="btn btn-success">Go Anywhere</a>
      </div>
  </div>
  
  

  )};

export default ContentCard;