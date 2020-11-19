import React from 'react';

var AskQuestion = ({question, onChangeQue, queScrNm, onChangeQueScrNm, handleCancel, submitQuestion}) => {

  return (
    <div className = 'que-text'>
      <div className ='bold'> Your question </div>
      <div ><textarea className ='text' value = {question} onChange ={onChangeQue}> </textarea></div>
      <div className ='que-line2'>Questions must be at least 20 characters long</div>
      <div className ='que-line2'>at least 20 characters</div>
      <div className ='que-line2'> screen name </div>
      <div ><textarea className ='ScrName' value = {queScrNm} onChange ={onChangeQueScrNm}> </textarea></div>
      <div className ='que-line2'>this name will be displayed with your answer</div>
      <div className ='que-line2'> by submitting I agree to the q&a guidelines</div>
      <div>
        <button className ='white-btn' onClick = {handleCancel}>cancel</button>
        <button className='red-btn' onClick = {submitQuestion}>submit question</button>
      </div>
    </div>
  );

}

export default AskQuestion;