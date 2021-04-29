/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeURL } from '../actions/index';
import ActivityChoiceCard from './ActivityChoiceCard.js'
import './pages.css'

const YogaChoice = () => {
  

  const [durationValue, setDurationValue] = useState(0);
  const [intensityValue, setIntensityValue] = useState(0);
  const [timeValue, setTimeValue] = useState("");
  //const videoURL = useSelector(state => state.urlReducer);
  const dispatch = useDispatch();

  
  const handleDropDownChange1 = (e) => {
    setDurationValue(e.target.value);
    }
  
  const handleDropDownChange2 = (e) => {
    setIntensityValue(e.target.value);
    }
  
  const handleDropDownChange3 = (e) => {
    setTimeValue(e.target.value);
    }
  
  const handleSubmit = () => {
   
    // console.log("Duration :" + durationValue);
    // console.log("Intensity :" + intensityValue);
    // console.log("Time : " + timeValue);
    //https://youtu.be/b1RTVla9wsY
      
    if (durationValue == 15 && intensityValue == 1 && timeValue === "Morning") {
      
      dispatch(changeURL('uBrSRnK_hIg'))
      
    } else if (durationValue == 15 && intensityValue == 1 && timeValue === "Evening") {
      
      dispatch(changeURL('b1RTVla9wsY'))
      
    } else if (durationValue == 15 && intensityValue == 2 && timeValue === "Morning") {
      
      dispatch(changeURL())
      
    } else if (durationValue == 15 && intensityValue == 2 && timeValue === "Evening") {
      
      dispatch(changeURL())

    } else if (durationValue == 30 && intensityValue == 1 && timeValue === "Morning") {
      
      dispatch(changeURL())

    } else if (durationValue == 30 && intensityValue == 1 && timeValue === "Evening") {
      
      dispatch(changeURL())

    } else if (durationValue == 30 && intensityValue == 2 && timeValue === "Morning") {
      
      dispatch(changeURL())

    } else if (durationValue == 30 && intensityValue == 2 && timeValue === "Evening") {
      
      dispatch(changeURL())

    } else if (durationValue == 45 && intensityValue == 1 && timeValue === "Morning") {
      
      dispatch(changeURL())

    } else if (durationValue == 45 && intensityValue == 1 && timeValue === "Evening") {
      
      dispatch(changeURL())

    } else if (durationValue == 45 && intensityValue == 2 && timeValue === "Morning") {
      
      dispatch(changeURL())

    } else if (durationValue == 45 && intensityValue == 2 && timeValue === "Evening") {
      
      dispatch(changeURL())

    }


  }
  
    return (
      <div>
        <div className="card-group">
          <div className="col-3 duration" >
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
            <div className="col-3 intensity" >
            <ActivityChoiceCard
              function={handleDropDownChange2}
              question={"What intensity level would you like?"}
              value1={1}
              value2={2}
              answer1={"1"}
              answer2={"2"}
                  />
            </div>
            <div className="col-3 time" >
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
        <Link to={"/YogaContent"} className="btn btn-primary" 
          onClick={() => handleSubmit()}>Submit</Link>
        {/* <button onClick={() => this.handleSubmit()}>Submit</button> */}
      </div>
    );
  }


export default YogaChoice;