import React from 'react';

const YogaChoiceCard = (props) => {
  return (
  
    // <div className="container-fluid d-flex justify-content-center">
    <div className="card border border-dark shadow-0 mb-3" style={{ maxWidth: 18 + "rem"}}>
      <p className="card-text text-primary">
        <p>{ props.question }</p>
    </p>
      <div className="card-body">
        <div class="form-group">
          <select class="custom-select">
            <option selected="">Please select your answer</option>
            <option value="1">{ props.answer1 }</option>
            <option value="2">{ props.answer2 }</option>
            <option value="3">{ props.answer3 }</option>
          </select>
        </div>
      </div>
  </div>
  
  

  )};

export default YogaChoiceCard;