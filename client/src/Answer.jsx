import React from 'react';

const Answer = ({ answer, ind, handleHelp }) => {
  return (
    <div className="ans-cont">
      <div>
        <span className="bold">A: </span>
        {answer.answer}
      </div>
      <div>
        <span className="ans-line2">
          <span>{answer.created_by}</span> - {answer.created_at}
        </span>
        <span
          className="ans-line2"
          onClick={() => {
            handleHelp('helpful', ind);
          }}
        >
          Helpful ({answer.helpful})
        </span>
        <span
          className="ans-line2"
          onClick={() => {
            handleHelp('notHelpful', ind);
          }}
        >
          Not helpful ({answer.not_helpful})
        </span>
      </div>
    </div>
  );
};

export default Answer;
