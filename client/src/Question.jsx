class Question1 extends React.Component {

  constructor(props) {
    super(props);
    this.state ={}
  }

}


= ({question, handleAnswer, toggleAnswer}) => {


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