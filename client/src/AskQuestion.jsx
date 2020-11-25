import React from 'react';

var AskQuestion = ({question, handleInputChange, queScrNm, handleCancel, submitQuestion}) => {
  //      <div className ='que-line2'>Questions must be at least 20 characters long</div>

  return (
    <div className = 'que-text'>
      <div className ='bold'> Your question </div>
      <div ><textarea className ='text' onChange ={(e) => {handleInputChange(e, 'question')}} name ='question'> </textarea></div>

      <div className ='que-line2'>at least 20 characters</div>
      <div className ='que-line2'> screen name </div>
      <div ><textarea className ='ScrName'  onChange ={(e) => {handleInputChange(e, 'queScrNm')}} name ='queScrNm'> </textarea></div>
      <div className ='que-line2'>this name will be displayed with your answer</div>
      <div className ='que-line2'> by submitting I agree to the q&a guidelines</div>
      <div>
        <button className ='btn white-btn' onClick = {handleCancel}>cancel</button>
        <button className='btn red-btn' onClick = {submitQuestion}>submit question</button>
      </div>
    </div>
  );

}

export default AskQuestion;