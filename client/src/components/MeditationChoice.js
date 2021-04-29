import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import ActivityChoiceCard from './ActivityChoiceCard.js';
import { FaClock, FaGrinBeamSweat, FaSun } from 'react-icons/fa';
import bgMed from '../assets/med-1.jpg'
import './pages.css';

const MeditationChoice = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  let clockStyle = { color: "blue", fontSize: "2.5em", marginLeft: "10px" };
  let sweatStyle = { color: "red", fontSize: "2.5em", marginLeft: "10px" };
  let sunStyle = { color: "green", fontSize: "2.5em", marginLeft: "10px" };

  const [durationValue, setDurationValue] = useState("");
  const [intensityValue, setIntensityValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [url, setURL] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [counter, setCounter] = useState(0);
  
  const handleDropDownChange1 = (e) => {
    setDurationValue(e.target.value)
    setCounter(counter + 1);
   
  }
  
  const handleDropDownChange2 = (e) => {
    setIntensityValue(e.target.value)
    setCounter(counter + 1);
  
  }
  
  const handleDropDownChange3 = (e) => {
    setTimeValue(e.target.value);
    setCounter(counter + 1);
    
  }
  
  const handleSubmit = async () => {
    
    try {
      
      const response = await fetch(`http://localhost:5000/MeditationChoice/:${durationValue}/:${timeValue}`, {
        method: "GET",
      });

      // results from database in JSON
      const jsonData = await response.json();
      setURL(jsonData[0].link);
      setTitle(jsonData[0].title);
      setDesc(jsonData[0].description);
      console.log(jsonData);

       
    } catch (err) {
      console.error(err);
    }
  }

    //Passing route and props through Link to MeditationContent component
    const newTo = {
      pathname: "/MeditationContent",
      state: {
        param1: url,
        param2: title,
        param3: desc
      }
    };
  
    return (
      <div >
        <div className="card activity-header"  >
          <div>
            <img src={bgMed} alt="Stones in a state of equilibrium" id="activity-inter" />
          </div>
          <div className="card-img-overlay text-light" id="activity-choice-text">
            <h1 id="activity-heading">A few questions...</h1>
            <br />
            <p className="text-light"><span>We have just <span className="text-warning">three questions</span> to ask you. </span><br></br><span>These questions will help us ensure you have a </span><span className="text-warning">mindful <br></br> experience tailored to your availability and skill level.</span><br></br> <span>Check them out below!</span><br></br><span></span></p>
          </div>
        </div>
        <div className="choice">
          <div className="card-group row no-gutters">
            <div className="col duration" >
              <div className="icon clock-icon">
                <FaClock style={clockStyle} />
              </div>
              <ActivityChoiceCard
                function={handleDropDownChange1}
                question={"How long do you have to spare today?"}
                value1={5}
                value2={10}
                value3={20}
                answer1={"5 minutes"}
                answer2={"10 minutes"}
                answer3={"20 minutes"} />
            </div>
            <div className="col intensity">
              <div className="icon clock-icon">
                <FaGrinBeamSweat style={sweatStyle} />
              </div>
              <ActivityChoiceCard
                function={handleDropDownChange2}
                question={"What intensity level would you like?"}
                value1={1}
                value2={2}
                value3={3}
                answer1={"1"}
                answer2={"2"}
                answer3={"3"} />
            </div>
            <div className="col ">
              <div className="icon clock-icon">
                <FaSun style={sunStyle} />
              </div>
              <ActivityChoiceCard
                function={handleDropDownChange3}
                question={"What time of the day is it currently?"}
                value1={"Morning"}
                value2={"Evening"}
                answer1={"Morning"}
                answer2={"Evening"}
              />
            </div>
          </div>
    
          {counter === 3 &&
            <Link to={newTo} className="btn btn-primary" onClick={() => handleSubmit()}>Submit</Link>
          }
          <footer className="page-footer font-small blue">
            <div className="footer-copyright text-center py-3">© 2021 Copyright</div>
          </footer>
        </div>
      </div>
    )
  };


export default MeditationChoice;