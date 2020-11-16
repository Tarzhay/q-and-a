import React from 'react';
import ReactDOM from 'react-dom';
import data from '../sample_data_v1_2r.js';
import Questions from './Questions.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      questions: data[0].questions,
      toggleAnswer: false,
      toggleQuestion: false
    };

    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleQuestion = this.handleQuestion.bind(this);

  }

  handleAnswer() {
    this.setState({toggleAnswer: true});
  }

  handleQuestion() {
    this.setState({toggleQuestion: true});
  }

  render() {
    var questions = this.state.questions;
    var toggleAnswer = this.state.toggleAnswer;
    var toggleQuestion = this.state.toggleQuestion;
    var handleAnswer = this.handleAnswer;
    var handleQuestion = this.handleQuestion;

    return (
      <div>
        <div> Q&A</div>
        <Questions questions = {questions} handleQuestion = {handleQuestion} handleAnswer ={handleAnswer} toggleAnswer={toggleAnswer} toggleQuestion={toggleQuestion}/>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));