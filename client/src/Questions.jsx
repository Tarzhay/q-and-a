import React from 'react';
// import Answer from 'Answer.jsx';
// import Question from 'Question.jsx';

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

var Question = ({question, handleAnswer, toggleAnswer}) => {


  return (
    <div>
      <div>Q: {question.question}</div>
      <div> {question.createdBy}</div>
      <div> {question.createdAt}</div>
      <div>{question.answers.map((answer) => (<Answer answer ={answer} />))}</div>
      <button onClick = {handleAnswer}>Answer it</button>
      <div>
        {toggleAnswer ?
          (<div><div> your answer </div>
          <div><textarea> </textarea></div>
          <div>Answers must be at least 20 characters long </div>
          <div>at least 20 characters</div>
          <div> screen name </div>
          <div><textarea> </textarea></div>
          <div>this name will be displayed with your answer</div>
          <div> by submitting I agree to the q&a guidelines
          <button>cancel</button>
          <button>submit answer</button>
          </div></div>)
         :
            ''
         }
       </div>

    </div>
    )

};

var Questions = ({questions, toggleAnswer, toggleQuestion, handleAnswer, handleQuestion}) => {
  return (
    <div>
      {questions.map((question) => (<Question question = {question} toggleAnswer ={toggleAnswer} handleAnswer={handleAnswer}/>))}
      <button onClick = {handleQuestion}>Ask a question</button>
      <div>{
        toggleQuestion? (<div> <div> Your question </div>
          <div><textarea> </textarea></div>
          <div>Questions must be at least 20 characters long</div>
          <div>at least 20 characters</div>
          <div> screen name </div>
          <div><textarea> </textarea></div>
          <div>this name will be displayed with your answer</div>
          <div> by submitting I agree to the q&a guidelines
          <button>cancel</button>
          <button>submit question</button>
          </div> </div>) : ''}

      </div>
    </div>
  );
};

export default Questions;