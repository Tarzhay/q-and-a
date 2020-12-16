import React from 'react';
import ReactDOM from 'react-dom';
import data from '../sample_data_v1_2r.js';
import Question from './Question.jsx';
import AskQuestion from './AskQuestion.jsx';
import axios from 'axios';
import { GlobalStyle } from './styles.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allQuestions: data[0].questions,
      questions: data[0].questions.slice(0, 2),
      bkpQuestions: [],
      toggleQuestion: false,
      togglePagination: false,
      paginationLowerLimit: 0,
      question: '',
      queScrNm: '',
      sortBy: '',
    };
    this.handleQuestion = this.handleQuestion.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
    this.getData = this.getData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  handleQuestion() {
    this.setState({ toggleQuestion: true });
  }

  handleCancel() {
    this.setState({ toggleQuestion: false });
  }

  handlePagination(action) {
    let {
      allQuestions,
      questions,
      paginationLowerLimit,
    } = this.state;
    let newLowerLimit;

    if (action === 'togglePagination') {
      this.setState({ togglePagination: true });
      newLowerLimit = 0;
    } else if (action === 'first') {
      newLowerLimit = 0;
    } else if (action === 'previous') {
      newLowerLimit = paginationLowerLimit - 2;
    } else if (action === 'next') {
      newLowerLimit = paginationLowerLimit + 2;
    } else if (action === 'last') {
      newLowerLimit =
        allQuestions.length % 2
          ? allQuestions.length - 1
          : allQuestions.length - 2;
    }

    questions = allQuestions.slice(newLowerLimit, newLowerLimit + 2);

    if (questions.length > 0) {
      this.setState({
        questions: questions,
        paginationLowerLimit: newLowerLimit,
      });
    }
    if (action === 'first') {
      this.setState({ togglePagination: false });
    }
  }

  handleInputChange(event) {
    let { name, value } = event.target;

    this.setState({
      [name]: value,
    });

    if (name === 'sortBy') {
      let sortedResult = this.sortQuestions(
        value,
        this.state.allQuestions,
      );
      this.setState({
        allQuestions: sortedResult,
        paginationLowerLimit: 0,
        togglePagination: false,
        questions: sortedResult.slice(0, 2),
      });
    }
  }

  getData() {
    let url = `/api/q-and-a${window.location.pathname}`;

    axios
      .get(url)
      .then((response) => {
        this.setState({
          allQuestions: response.data.rows[0].questions,
          questions: response.data.rows[0].questions.slice(0, 2),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getData();
  }

  submitQuestion() {
    let questionQuery = {
      question: this.state.question,
      created_by: this.state.queScrNm,
    };

    axios
      .post(`/api/q-and-a${window.location.pathname}question`, questionQuery)
      .then((response) => {
        let question = response.data.rows[0];

        this.setState({
          toggleQuestion: false,
          question: '',
          queScrNm: '',
          questions: [question].concat(this.state.questions),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  sortQuestions(sortBy, questions) {
    let sortedQuestions = questions.slice();

    switch (sortBy) {
      case 'mostanswers':
        sortedQuestions.sort((a, b) => {
          let x = a.answers ? a.answers.length : 0;
          let y = b.answers ? b.answers.length : 0;

          if (x > y) {
            return -1;
          }
          if (x < y) {
            return 1;
          }
          return 0;
        });
        break;
      case 'fewestanswers':
        sortedQuestions.sort((a, b) => {
          let x = a.answers ? a.answers.length : 0;
          let y = b.answers ? b.answers.length : 0;
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        break;
      case 'newestanswers':
        sortedQuestions.sort((a, b) => {
          let x = a.answers ? a.answers[0].created_at : '';
          let y = b.answers ? b.answers[0].created_at : '';

          if (x > y) {
            return -1;
          }
          if (x < y) {
            return 1;
          }
          return 0;
        });
        break;
      default:
        sortedQuestions.sort((a, b) => {
          let x = a.created_at;
          let y = b.created_at;

          if (x > y) {
            return -1;
          }
          if (x < y) {
            return 1;
          }
          return 0;
        });
    }
    return sortedQuestions;
  }

  render() {
    const {
      allQuestions,
      questions,
      toggleQuestion,
      togglePagination,
    } = this.state;
    let style = togglePagination ? 'btn red-btn-long' : 'btn red-btn';

    return (
      <div className="qa-parent">
        <GlobalStyle />
        <div className="qa-child">
          <div className="qa bold">
            {' '}
            Q&amp;A ({allQuestions.length})
          </div>
          <div id="filterBox">
            <br></br>
            <label className="filterSorter">
              <b>Sort by</b>
              <select
                className="marginLeft"
                name="sortBy"
                onChange={(e) => {
                  this.handleInputChange(e);
                }}
              >
                <option
                  className="white-btnans-btn"
                  value="newestquestions"
                >
                  newest questions
                </option>
                <option
                  className="white-btnans-btn"
                  value="newestanswers"
                >
                  newest answers
                </option>
                <option
                  className="white-btnans-btn"
                  value="fewestanswers"
                >
                  fewest answers
                </option>
                <option
                  className="white-btnans-btn"
                  value="mostanswers"
                >
                  most answers
                </option>
              </select>
            </label>
          </div>
          <div>
            {questions.map((question) => (
              <Question question={question} />
            ))}
            {togglePagination ? (
              <div className="pagination-cont">
                <span
                  className="pagination-left"
                  onClick={() => {
                    this.handlePagination('first');
                  }}
                >
                  &lt;&lt;&lt;
                </span>
                <span
                  className="pagination"
                  onClick={() => {
                    this.handlePagination('previous');
                  }}
                >
                  &lt;
                </span>
                <span
                  className="pagination"
                  onClick={() => {
                    this.handlePagination('next');
                  }}
                >
                  &gt;
                </span>
                <span
                  className="pagination"
                  onClick={() => {
                    this.handlePagination('last');
                  }}
                >
                  &gt;&gt;&gt;
                </span>
              </div>
            ) : (
              <button
                className="btn white-btn"
                onClick={() => {
                  this.handlePagination('togglePagination', 0);
                }}
              >
                Load more questions
              </button>
            )}

            <button className={style} onClick={this.handleQuestion}>
              Ask a question
            </button>

            <div>
              {toggleQuestion ? (
                <div>
                  {' '}
                  <AskQuestion
                    handleInputChange={this.handleInputChange}
                    handleCancel={this.handleCancel}
                    submitQuestion={this.submitQuestion}
                  />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('service2'));
