import React from 'react';
import Answer from './Answer.jsx';
import AnswerIt from './AnswerIt.jsx';
import today from './Today.js';
import axios from 'axios';

class Question extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      toggleAnswer: false,
      answer: '',
      ansScrNm: ''
    }

    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.handleInputChangeAns = this.handleInputChangeAns.bind(this);
    this.handleHelp = this.handleHelp.bind(this);

  }


  handleAnswer() {
    this.setState({toggleAnswer: true});
  }

  handleCancel() {
    this.setState({toggleAnswer: false});
  }

  handleInputChangeAns(event, name) {
    this.setState({
      [name]: event.target.value
    });

  }

  handleHelp(flag, answerInd) {
    var question = this.props.question;
    question.answers[answerInd][flag] = question.answers[answerInd][flag] +1;
    this.setState({question: question});
  }

  submitAnswer() {

    var question = this.props.question;
    var questionId = question.questionId;
    var answerId = question.answers.length + 1;
    var answer = this.state.answer;
    var ansScrNm = this.state.ansScrNm;

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


    axios.post(`/api${window.location.pathname}answers`, {questionId: questionId, ansObj: ansObj})
    .then((response) => {
      this.setState({question: question});
    })
    .catch((err) => {
      console.log(err);
    })

    this.setState({toggleAnswer: false});
  }


  render() {
    var question = this.props.question;
    var toggleAnswer = this.state.toggleAnswer;
    var handleInputChangeAns = this.handleInputChangeAns;
    var handleAnswer = this.handleAnswer;
    var handleCancel = this.handleCancel;
    var submitAnswer = this.submitAnswer;
    var handleHelp = this.handleHelp;

    return (
      <div className='que-cont'>
      <div  className='bold'>Q: {question.question}</div>
      <div className ='que-line2'> {question.createdBy}
       - {question.createdAt}</div>
      <div>{question.answers.map((answer, ind) => (<Answer answer ={answer} handleHelp ={handleHelp} ind={ind}/>))}</div>
      <button className ='btn white-btnans-btn' onClick = {handleAnswer}>Answer it</button>
      <div>
        {toggleAnswer ?
          (<div>
            <AnswerIt handleInputChangeAns ={handleInputChangeAns} handleCancel={handleCancel} submitAnswer={submitAnswer}/>
          </div>)
         :
            ''
         }
       </div>

    </div>
    );
  }
}

export default Question;