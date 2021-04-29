/* eslint-disable eqeqeq */
import React, { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import ActivityChoiceCard from './ActivityChoiceCard.js'
import { FaClock, FaGrinBeamSweat, FaSun } from 'react-icons/fa';
import bgYoga from '../assets/yoga-6.jpg'
import './pages.css'

const YogaChoice = () => {

  useEffect(() => {
  window.scrollTo(0, 0)
  }, [])
  
  
  let clockStyle = { color: "blue", fontSize: "2.5em", marginLeft: "10px" };
  let sweatStyle = { color: "red", fontSize: "2.5em", marginLeft: "10px" };
  let sunStyle = { color: "green", fontSize: "2.5em", marginLeft: "10px" };

  const [durationValue, setDurationValue] = useState(0);
  const [intensityValue, setIntensityValue] = useState(0);
  const [timeValue, setTimeValue] = useState("");
  const [id, setId] = useState("");
  const [url, setURL] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [counter, setCounter] = useState(0);
  

  
  const handleDropDownChange1 = (e) => {
    setDurationValue(e.target.value);
    setCounter(counter+1);

  }
  
  const handleDropDownChange2 = (e) => {
    setIntensityValue(e.target.value);
    setCounter(counter+1);

  }
  
  const handleDropDownChange3 = (e) => {
    setTimeValue(e.target.value);
    setCounter(counter+1);

  }

  const handleSubmit = async () => {
    try {
      
      const response = await fetch(`http://localhost:5000/YogaChoice/${durationValue}/${intensityValue}/${timeValue}`, {
        method: "GET",
      });

      // results from database in JSON
      const jsonData = await response.json();
      setId(jsonData[0].id);
      setURL(jsonData[0].link);
      setTitle(jsonData[0].title);
      setDesc(jsonData[0].description);
      console.log(jsonData);

    } catch (err) {
      console.error(err);
    }
  };

  //Passing route and props through Link to YogaContent component
  const newTo = {
    pathname: "/YogaContent",
    state: { param1: url,
      param2: title,
      param3: desc,
      param4: id
    }
    };
  

  return (
  <div>
   <div className="card activity-header"  >
      <div>
        <img src={bgYoga} alt="A guy rolling out a yoga mat" id="activity-inter" />
        </div>
        <div className="card-img-overlay text-light" id="activity-choice-text">
          <h1 id="activity-heading">A few questions...</h1>
          <br/>
        <p className="text-light"><span>We have just <span className="text-secondary">three questions</span> to ask you. </span><br></br><span>These questions will help us ensure you have an </span><br></br><span> <span className="text-secondary">experience tailored to your availability and skill level.</span></span><br></br> <span>Check them out below!</span><br></br><span></span></p>
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
              value1={15}
              value2={30}
              value3={45}
              answer1={"15 minutes"}
              answer2={"30 minutes"}
              answer3={"45 minutes"}/>
            </div>
          <div className="col intensity" >
            <div className="icon clock-icon">
              <FaGrinBeamSweat style={sweatStyle} />
            </div>
            <ActivityChoiceCard
              function={handleDropDownChange2}
              question={"What intensity level would you like?"}
              value1={1}
              value2={2}
              answer1={"1"}
              answer2={"2"}
                  />
            </div>
          <div className="col time" >
            <div className="icon clock-icon">
              <FaSun style={sunStyle} />
            </div>
            <ActivityChoiceCard
              function={handleDropDownChange3}
              value1={"Morning"}
              value2={"Evening"}
              question={"What time of the day is it currently?"}
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
    );
  }


export default YogaChoice;