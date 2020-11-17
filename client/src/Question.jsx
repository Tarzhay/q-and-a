import React from 'react';
import Answer from './Answer.jsx';

class Question extends React.Component {

  constructor(props) {
    super(props);
    this.question = props.question;
    this.state ={
      toggleAnswer: false,
      answer: '',
      ansScrNm: ''
    }

    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.onChangeAns = this.onChangeAns.bind(this);
    this.onChangeAnsScrNm = this.onChangeAnsScrNm.bind(this);
  }

  handleAnswer() {
    this.setState({toggleAnswer: true});
  }

  handleCancel() {
    this.setState({toggleAnswer: false});
  }

  onChangeAns(e) {
    this.setState({answer: e.target.value});
  }

  onChangeAnsScrNm(e) {
    this.setState({ansScrNm: e.target.value});
  }

  submitAnswer() {
     //do something
    //read teh content in the text box
    //send the question, screen name, date tot he server
    //inside the server update the product's question array with a new question based on the product ID

    var question = this.question;

    console.log(question);
    var questionId = question.questionId;
    var answerId = question.answers.length + 1;
    var answer = this.state.answer;
    var ansScrNm = this.state.ansScrNm;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    var ansObj = {_id: answerId,
    answerId: answerId,
    answer: answer,
    createBy: ansScrNm,
    createAt: today,
    helpful: 0,
    notHelpful: 0};

    question.answers.unshift(ansObj);
    this.setState({question: question});
    this.setState({toggleAnswer: false, answer: '',
    ansScrNm: ''});

    axios.post(`http://localhost:3000/${window.location.pathname}/api/Q_A/answer`, {questionId: questionId, ansObj: ansObj})
    .then((response) => {
      console.log(response.data);
      this.setState({question: question});
    })
    .catch((err) => {
      console.log(err);
    })

    this.setState({toggleAnswer: false});
  }


  render() {
    var question = this.question;
    var toggleAnswer = this.state.toggleAnswer;
    var answer = this.state.answer;
    var ansScrNm = this.state.ansScrNm;
    var handleAnswer = this.handleAnswer;
    var handleCancel = this.handleCancel;
    var submitAnswer = this.submitAnswer;
    var onChangeAns = this.onChangeAns;
    var onChangeAnsScrNm = this.onChangeAnsScrNm;

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
          <div><textarea  value = {answer} onChange ={onChangeAns}> </textarea></div>
          <div>Answers must be at least 20 characters long </div>
          <div>at least 20 characters</div>
          <div> screen name </div>
          <div><textarea  value = {ansScrNm} onChange ={onChangeAnsScrNm}> </textarea></div>
          <div>this name will be displayed with your answer</div>
          <div> by submitting I agree to the q&a guidelines
          <button onClick = {handleCancel}>cancel</button>
          <button onClick = {submitAnswer}>submit answer</button>
          </div></div>)
         :
            ''
         }
       </div>

    </div>
    );
  }
}

export default Question;