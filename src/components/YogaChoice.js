import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ActivityChoiceCard from './ActivityChoiceCard.js'
import './pages.css'

class YogaChoice extends Component {
  
  render() {
    return (
      <div>
          <div className="card-group">
            <div className="col-3">
                <ActivityChoiceCard question={ "How long do you have to spare today?" }
                  answer1={"15 minutes"}
                  answer2={"30 minutes"}
                  answer3={"45 minutes"}/>
            </div>
            <div className="col-3">
                <ActivityChoiceCard question={ "What intensity level would you like?" }
                  answer1={"1"}
                  answer2={"2"}
                  />
            </div>
            <div className="col-3">
                <ActivityChoiceCard question={ "What time of the day is it currently?" }
                  answer1={"Morning"}
                  answer2={"Evening"}
                />
            </div>
          </div>     
        <Link to={"/YogaContent"} className= "btn btn-primary" >Submit</Link>
      </div>
    );
  }
}

export default YogaChoice;