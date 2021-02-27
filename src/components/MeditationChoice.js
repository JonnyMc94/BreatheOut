import React from 'react';
import { Link } from 'react-router-dom';
import ActivityChoiceCard from './ActivityChoiceCard.js';
import './pages.css';

const MeditationChoice = (props) => {
  return (
    <div className="">
      <div className="card-group">
            <div className="col-3">
                <ActivityChoiceCard question={ "How long do you have to spare today?" }
                  answer1={"5 minutes"}
                  answer2={"10 minutes"}
                  answer3={"20 minutes"}/>
            </div>
            <div className="col-3">
                <ActivityChoiceCard question={ "What intensity level would you like?" }
                  answer1={"1"}
                  answer2={"2"}
                  answer3={"3"} />
            </div>
            <div className="col-3">
                <ActivityChoiceCard question={ "What time of the day is it currently?" }
                  answer1={"Morning"}
                  answer2={"Evening"}
                />
            </div>
          </div>    
    
        <Link to={"/MeditationContent"} className= "btn btn-primary" >Submit</Link>
    </div>
    

  )};

export default MeditationChoice;