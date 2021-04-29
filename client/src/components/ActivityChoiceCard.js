import React from 'react';


const ActivityChoiceCard = (props) => {
  return (
    <div className="cardborder-light shadow-0 mb-3 question" >
        <div className="card-text text-primary">
          <p>{ props.question }</p>
        </div>
      <div className="card-body">
        <div className="form-group">
          <select className="custom-select"  onChange={ props.function  } required="required">
            <option value="">Please select your answer</option>
            <option value={props.value1}>{ props.answer1 }</option>
            <option value={props.value2}>{ props.answer2 }</option>
            <option value={props.value3}>{ props.answer3 }</option>
          </select>
        </div>
      </div>
    </div>
  
  

  )};

export default ActivityChoiceCard;