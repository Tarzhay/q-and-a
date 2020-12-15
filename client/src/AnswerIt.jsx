import React from 'react';

const AnswerIt = ({
  handleInputChangeAns,
  handleCancel,
  submitAnswer,
}) => {
  return (
    <div className="ans-text">
      <div className="bold"> your answer </div>
      <div>
        <textarea
          className="text"
          onChange={(event) => {
            handleInputChangeAns(event);
          }}
          name="answer"
        />
      </div>

      <div className="que-line2">at least 20 characters</div>
      <div className="que-line2"> screen name </div>
      <div>
        <textarea
          className="ScrName"
          onChange={(event) => {
            handleInputChangeAns(event);
          }}
          name="ansScrNm"
        />
      </div>
      <div className="que-line2">
        this name will be displayed with your answer
      </div>
      <div className="que-line2">
        by submitting I agree to the q&amp;a guidelines
      </div>
      <div className="ans-btn-cont">
        <button className="btn white-btn" onClick={handleCancel}>
          cancel
        </button>
        <button className="btn red-btn" onClick={submitAnswer}>
          submit answer
        </button>
      </div>
    </div>
  );
};

export default AnswerIt;
