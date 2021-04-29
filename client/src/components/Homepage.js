import React, { Component } from 'react';
import ContentCard from './ContentCard.js'
import YogaChoice from './YogaChoice.js'
import { Link, animateScroll as scroll } from 'react-scroll';
import img1 from '../assets/meditation.jpg';
import img2 from '../assets/yoga2.jpg';
import img3 from '../assets/breatheout-homepage.jpg'

class Homepage extends Component {
  
  hideScroller = () => {
    
  }

 

  render() {

    let spanStyle = "text-primary";
    return (
  <div>
      <div className=" container-fluid p-0" id="header-block"
            style={{paddingRight: 10 + "rem", paddingLeft: 10 + "rem" }}>
         <img src={img3} alt="sunset-beach" id="header-img" className="img-fluid w-100 p-0"/>
          <div className="text-block">
            <h1 className="display-3 "id="yoga-title">Welcome to <span className="text-primary">BreatheOut</span>  </h1>
              <p className="lead" id="yoga-para">This site is about relaxing and switching off - no matter how much time you have. Click below to find out more! </p>
          </div>
          {/* <Link activeClass="active"
                to="first-section" spy={true}
                smooth={true} duration={1000} className="bounce"
          ></Link> */}
      </div>
          

        <div className="container-fluid d-flex justify-content-center" style={{ paddingRight: 10 + "rem", paddingLeft: 10 + "rem"}}>
            <div id="first-section"></div>
          <div className="row">
            
            <div className="row-3" style={{ marginBottom: 100+"px"}} id="med-card">
              <ContentCard imgsrc={img1} imgalt={"Lotus-flower"}
                cardTitle={"Mindfulness & Meditaiton"} cardText={"A place where you can explore meditation and midfulness practices"} choiceName={"MeditationChoice"}/>
            </div>

            <div className="row-3" style={{ paddingTop: 30 + "px"}} id="yoga-card">
              <ContentCard imgsrc={img2} imgalt={"Yoga-Pose-Sunset"}
                cardTitle={`Yoga & Mobility`} cardText={"A place where you can explore stretching, yoga and mobility practices"} choiceName={"YogaChoice"}/>
            </div>

          </div>  
        </div>

          <footer className="page-footer font-small blue">
            <div className="footer-copyright text-center py-3">© 2021 Copyright</div>
          </footer>
        
      </div>
    );
  }
}

export default Homepage;