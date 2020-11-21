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
    this.onChangeAns = this.onChangeAns.bind(this);
    this.onChangeAnsScrNm = this.onChangeAnsScrNm.bind(this);
    this.handleHelp = this.handleHelp.bind(this);

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

  handleHelp(flag, answerId) {

    // var question = this.question;
    // var questionId = question.questionId;
    // var answers = question[question.length - questionId].answers;
    // question[question.length - questionId].answers[answers.length - answersId][flag]++;

    // axios.post(`http://localhost:3000${window.location.pathname}/api/Q_A/flag`, {questionId: questionId, answerId: answerId, flag:flag})
    // .then((response) => {
    //   console.log(response.data);
    //   this.setState({question: question});
    // })
    // .catch((err) => {
    //   console.log(err);
    // })

  }

  submitAnswer() {

    var question = this.props.question;

    console.log(question);
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

    axios.post(`http://localhost:3000${window.location.pathname}/api/Q_A/answer`, {questionId: questionId, ansObj: ansObj})
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
    var question = this.props.question;
    var toggleAnswer = this.state.toggleAnswer;
    var answer = this.state.answer;
    var ansScrNm = this.state.ansScrNm;
    var handleAnswer = this.handleAnswer;
    var handleCancel = this.handleCancel;
    var submitAnswer = this.submitAnswer;
    var onChangeAns = this.onChangeAns;
    var onChangeAnsScrNm = this.onChangeAnsScrNm;
    var handleHelp = this.handleHelp;

    return (
      <div className='que-cont'>
      <div  className='bold'>Q: {question.question}</div>
      <div className ='que-line2'> {question.createdBy}
       - {question.createdAt}</div>
      <div>{question.answers.map((answer) => (<Answer answer ={answer} handleHelp ={handleHelp} />))}</div>
      <button className ='white-btnans-btn' onClick = {handleAnswer}>Answer it</button>
      <div>
        {toggleAnswer ?
          (<div>
            <AnswerIt answer ={answer} onChangeAns ={onChangeAns} ansScrNm ={ansScrNm} onChangeAnsScrNm={onChangeAnsScrNm} handleCancel={handleCancel} submitAnswer={submitAnswer}/>
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