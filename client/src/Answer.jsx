import React from 'react';

var Answer = ({answer}) => {

  return (
    <div>
      <div>A: {answer.answer}</div>
      <div> {answer.createBy}</div>
      <div> {answer.createAt}</div>
      <div>helpful ({answer.helpful})</div>
      <div>not helpful ({answer.notHelpful})</div>
    </div>
    );

};

export default Answer;