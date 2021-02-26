import React from 'react';


const ActivityChoiceCard = (props) => {
  return (
  
    // <div className="container-fluid d-flex justify-content-center">
    <div className="card-choice border border-light shadow-0 mb-3" style={{ maxWidth: 18 + "rem"}}>
      <div className="card-text text-primary">
        <p>{ props.question }</p>
    </div>
      <div className="card-body">
        <div className="form-group">
          <select className="custom-select">
            <option selected="">Please select your answer</option>
            <option value="1">{ props.answer1 }</option>
            <option value="2">{ props.answer2 }</option>
            <option value="3">{ props.answer3 }</option>
          </select>
        </div>
      </div>
    </div>
  
  

  )};

export default ActivityChoiceCard;