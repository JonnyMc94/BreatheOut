import React, { Component } from 'react';
import YogaChoiceCard from './YogaChoiceCard.js'
import './pages.css'

class YogaChoice extends Component {
  
  render() {
    return (
      <div className="card-group">
        <YogaChoiceCard question={ "How long do you have to spare today?" }
          answer1={"15 minutes"}
          answer2={"10 minutes"}
          answer3={ "20 minutes" }/>
        <YogaChoiceCard question={ "What intensity level would you like?" }
          answer1={"1"}
          answer2={"2"}
          answer3={ "3" }/>
        <YogaChoiceCard question={ "What time of day is it?" }
          answer1={"Morning"}
          answer2={"Evening"}
          />
      </div>     
    );
  }
}

export default YogaChoice;