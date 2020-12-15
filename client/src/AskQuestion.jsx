import React from 'react';

const AskQuestion = ({
  handleInputChange,
  handleCancel,
  submitQuestion,
}) => {
  return (
    <div className="que-text">
      <div className="bold"> Your question </div>
      <div>
        <textarea
          className="text"
          onChange={(event) => {
            handleInputChange(event);
          }}
          name="question"
        />
      </div>

      <div className="que-line2">at least 20 characters</div>
      <div className="que-line2"> screen name </div>
      <div>
        <textarea
          className="ScrName"
          onChange={(event) => {
            handleInputChange(event);
          }}
          name="queScrNm"
        />
      </div>
      <div className="que-line2">
        this name will be displayed with your answer
      </div>
      <div className="que-line2">
        by submitting I agree to the q&a guidelines
      </div>
      <div>
        <button className="btn white-btn" onClick={handleCancel}>
          cancel
        </button>
        <button className="btn red-btn" onClick={submitQuestion}>
          submit question
        </button>
      </div>
    </div>
  );
};

export default AskQuestion;
