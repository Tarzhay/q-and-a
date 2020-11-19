import React from 'react';
import ReactDOM from 'react-dom';
import data from '../sample_data_v1_2r.js';
import Question from './Question.jsx';
import AskQuestion from './AskQuestion.jsx';
import axios from 'axios';
import today from './Today.js';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      questions: data[0].questions,
      toggleQuestion: false,
      question: '',
      queScrNm: ''
    };
    this.handleQuestion = this.handleQuestion.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
    this.onChangeQue = this.onChangeQue.bind(this);
    this.onChangeQueScrNm = this.onChangeQueScrNm.bind(this);
    this.getData = this.getData.bind(this);
  }

  handleQuestion() {
    this.setState({toggleQuestion: true});
  }

  handleCancel() {
    this.setState({toggleQuestion: false});
  }

  onChangeQue(e) {
    this.setState({question: e.target.value});
  }

  onChangeQueScrNm(e) {
    this.setState({queScrNm: e.target.value});
  }

  getData(lowerLimit) {
    axios.get(`http://localhost:3000${window.location.pathname}/api/Q_A/question`, queObj)
    .then((response) => {
      console.log(response.data);
      this.setState({questions: response.data});
    })
    .catch((err) => {
      console.log(err);
    })
  }

  submitQuestion() {
    //do something
    //read teh content in the text box
    //send the question, screen name, date tot he server
    //inside the server update the product's question array with a new question based on the product ID

    var questions = this.state.questions;
    var questionId = questions.length + 1;
    var question = this.state.question;
    var queScrNm = this.state.queScrNm;

    var queObj = {
      _id: questionId,
      questionId: questionId,
      question: question,
      createdBy: queScrNm,
      createdAt: today,
      answers: []
    };

    //console.log('queObj',queObj);

    questions.push(queObj);
    this.setState({questions: questions});
    this.setState({toggleAnswer: false, question: '',
    queScrNm: ''});

    //console.log('questions',questions);

    axios.post(`http://localhost:3000${window.location.pathname}/api/Q_A`, queObj)
    .then((response) => {
      console.log(response.data);
      this.setState({questions: questions});
    })
    .catch((err) => {
      console.log(err);
    })
    this.setState({toggleQuestion: false});
  }

  render() {
    var questions = this.state.questions;
    var toggleQuestion = this.state.toggleQuestion;
    var question = this.state.question;
    var queScrNm = this.state.queScrNm;
    var handleQuestion = this.handleQuestion;
    var handleCancel = this.handleCancel;
    var submitQuestion = this.submitQuestion;
    var onChangeQue = this.onChangeQue;
    var onChangeQueScrNm = this.onChangeQueScrNm;

    console.log('render questions', questions);


    return (
      <div className = 'qa-parent'>
        <div className = 'qa-child'>
        <div className ='qa bold'> Q&A</div>
        <div>
          {questions.map((question) => (<Question question = {question} />))}
          <button className='white-btn'>Load more questions</button>
          <button className='red-btn' onClick = {handleQuestion}>Ask a question</button>
          <div>{
            toggleQuestion? (<div> <AskQuestion question={question} onChangeQue={onChangeQue} queScrNm={queScrNm} onChangeQueScrNm={onChangeQueScrNm} handleCancel={handleCancel} submitQuestion={submitQuestion} /></div>) : ''}
         </div>
         </div>
         </div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));