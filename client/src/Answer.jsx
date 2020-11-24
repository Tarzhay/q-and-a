import React from 'react';

var Answer = ({answer, ind, handleHelp}) => {

  return (
    <div className='ans-cont'>
      <div><span className='bold'>A: </span>{answer.answer}</div>
      <div>
      <span className ='ans-line2'> <span>{answer.createBy}</span> -  {answer.createAt}</span>
      <span className ='ans-line2' onClick ={() => {handleHelp('helpful', ind)}}> Helpful ({answer.helpful}) </span>
      <span className ='ans-line2' onClick ={() => {handleHelp('notHelpful', ind)}}>Not helpful ({answer.notHelpful}) </span>
      </div>
    </div>
    );

};

export default Answer;