import React from 'react';

var AnswerIt = ({ handleInputChangeAns, handleCancel, submitAnswer}) => {
  // <div className ='que-line2'>Answers must be at least 20 characters long </div>

  return (
    <div className='ans-text'>
            <div className='bold'> your answer </div>
          <div><textarea className ='text' onChange ={(e) => {handleInputChangeAns(e, 'answer')}} name ='answer'> </textarea></div>

          <div className ='que-line2'>at least 20 characters</div>
          <div className ='que-line2'> screen name </div>
          <div><textarea className ='ScrName'  onChange ={(e) => {handleInputChangeAns(e, 'ansScrNm')}} name ='ansScrNm'> </textarea></div>
          <div className ='que-line2'> this name will be displayed with your answer</div>
          <div className ='que-line2'> by submitting I agree to the q&a guidelines</div>
          <div>
            <button className ='white-btn' onClick = {handleCancel}>cancel</button>
            <button className='red-btn' onClick = {submitAnswer}>submit answer</button>
          </div>
    </div>
  );

}

export default AnswerIt;