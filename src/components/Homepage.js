import React, { Component } from 'react';
import ContentCard from './ContentCard.js'
import img1 from '../assets/meditation.jpg';
import img2 from '../assets/yoga2.jpg';
import './pages.css'

class Homepage extends Component {
  
  render() {
    return (
      <div className="container-fluid d-flex justify-content-center"
      style={{ paddingTop: 10 + "rem", paddingBottom: 10 + "rem", paddingRight: 10 + "rem", paddingLeft: 10 + "rem"}}
      >
        <div className="row">
          <div className="row-3" style={{ paddingTop: 30 + "px", paddingBottom: 30 + "px", borderRadius: 50 + "px" }}>
            <ContentCard imgsrc={img1} imgalt={"Lotus-flower"}
              cardTitle={"Mindfulness & Meditaiton"} cardText={"A place where you can explore meditation and midfulness practices"} />
          </div>
          <div className="row-3" style={{ paddingTop: 30 + "px", paddingBottom: 30 + "px"}}>
            <ContentCard imgsrc={img2} imgalt={"Yoga-Pose-Sunset"}
              cardTitle={"Yoga & Mobility"} cardText={"A place where you can explore stretching, yoga and mobility practices"}  />
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;