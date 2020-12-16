import React from 'react';
import Answer from './Answer.jsx';
import AnswerIt from './AnswerIt.jsx';
import axios from 'axios';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleAnswer: false,
      answer: '',
      ansScrNm: '',
    };
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleHelp = this.handleHelp.bind(this);
  }

  handleAnswer() {
    this.setState({ toggleAnswer: true });
  }

  handleCancel() {
    this.setState({ toggleAnswer: false });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleHelp(flag, answerInd) {
    var question = this.props.question;
    question.answers[answerInd][flag] =
      question.answers[answerInd][flag] + 1;
    // TO DO: update database

    this.setState({ question: question });
  }

  submitAnswer() {
    let answerQuery = {
      answer: this.state.answer,
      created_by: this.state.ansScrNm,
    };

    axios
      .post(`/api/q-and-a/${window.location.pathname.replace(/\//g, '')}/answer`, {
        question_id: this.props.question.question_id,
        answerObj: answerQuery
      })
      .then((response) => {
        let question = this.props.question;
        let answer = response.data.rows[0];

        if (question.answers) {
          question.answers.unshift(answer);
        } else {
          question.answers = [answer];
        }
        this.setState({
          question: question,
          toggleAnswer: false,
          answer: '',
          ansScrNm: '',
        });
        this.setState({ question: question });
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({ toggleAnswer: false });
  }

  render() {
    let question = this.props.question;
    let toggleAnswer = this.state.toggleAnswer;

    return (
      <div className="que-cont">
        <div className="bold">Q: {question.question}</div>
        <div className="que-line2">
          {question.created_by} - {question.created_at}
        </div>
        <div>
          {question.answers &&
            question.answers.length > 0 &&
            question.answers.map((answer, ind) => (
              <Answer
                answer={answer}
                handleHelp={this.handleHelp}
                ind={ind}
              />
            ))}
        </div>
        <button
          className="btn white-btnans-btn"
          onClick={this.handleAnswer}
        >
          Answer it
        </button>
        <div>
          {toggleAnswer ? (
            <div>
              <AnswerIt
                handleInputChangeAns={this.handleInputChange}
                handleCancel={this.handleCancel}
                submitAnswer={this.submitAnswer}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default Question;
