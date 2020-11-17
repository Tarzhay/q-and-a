import React from 'react';
import ReactDOM from 'react-dom';
import data from '../sample_data_v1_2r.js';
import Question from './Question.jsx';
import axios from 'axios';


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

  submitQuestion() {
    //do something
    //read teh content in the text box
    //send the question, screen name, date tot he server
    //inside the server update the product's question array with a new question based on the product ID

    var questions = this.state.questions;
    var questionId = questions.length + 1;
    var question = this.state.question;
    var queScrNm = this.state.queScrNm;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    var queObj = {
      _id: questionId,
      questionId: questionId,
      question: question,
      createdBy: queScrNm,
      createdAt: today,
      answers: []
    };

    questions.unshift(queObj);

    axios.post(`/${window.location.pathname}/api/Q_A/question`, queObj)
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


    return (
      <div>
        <div> Q&A</div>
        <div>
          {questions.map((question) => (<Question question = {question} />))}
          <button onClick = {handleQuestion}>Ask a question</button>
          <div>{
            toggleQuestion? (<div> <div> Your question </div>
              <div><textarea value = {question} onChange ={onChangeQue}> </textarea></div>
              <div>Questions must be at least 20 characters long</div>
              <div>at least 20 characters</div>
              <div> screen name </div>
              <div><textarea value = {queScrNm} onChange ={onChangeQueScrNm}> </textarea></div>
              <div>this name will be displayed with your answer</div>
              <div> by submitting I agree to the q&a guidelines
              <button onClick = {handleCancel}>cancel</button>
              <button onClick = {submitQuestion}>submit question</button>
              </div> </div>) : ''}
         </div>
         </div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));