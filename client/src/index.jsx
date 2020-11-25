import React from 'react';
import ReactDOM from 'react-dom';
import data from '../sample_data_v1_2r.js';
import Question from './Question.jsx';
import AskQuestion from './AskQuestion.jsx';
import axios from 'axios';
import today from './Today.js';
import sortQuestions from './SortQuestions.js';
import {GlobalStyle} from './styles.js'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      allQuestions: data[0].questions,
      questions: data[0].questions.slice(0,2),
      bkpQuestions: [],
      toggleQuestion: false,
      togglePagination: false,
      paginationLowerLimit: 0,
      question: '',
      queScrNm: '',
      sortBy: ''
    };
    this.handleQuestion = this.handleQuestion.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
    this.getData = this.getData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePagination = this.handlePagination.bind(this);

  }

  handleQuestion() {
    this.setState({toggleQuestion: true});
  }

  handleCancel() {
    this.setState({toggleQuestion: false});
  }

  handlePagination(action) {

    var {allQuestions, questions, paginationLowerLimit} = this.state;
    var newLowerLimit;

    if (action === 'togglePagination') {

      this.setState({togglePagination:true});
      newLowerLimit = 0;

    } else if (action === 'first') {

      newLowerLimit = 0;

    } else if (action === 'previous') {

      newLowerLimit = paginationLowerLimit - 2;

    } else if (action === 'next') {

      newLowerLimit = paginationLowerLimit + 2;

    } else if (action === 'last') {

      newLowerLimit = (allQuestions.length%2) ? (allQuestions.length -1) : (allQuestions.length -2);

    }

    questions = allQuestions.slice(newLowerLimit, newLowerLimit + 2);

    console.log('I am here', questions);
    console.log('I am here', newLowerLimit);
    console.log('I am here', allQuestions);

    if (questions.length > 0) {
      this.setState({questions:questions, paginationLowerLimit: newLowerLimit});
    }
    if (action  === 'first') {
      this.setState({togglePagination:false});
    }

  }

  handleInputChange(event, name) {
    var value = event.target.value;

    console.log('name:' + name + ' value:' +value);

    this.setState({
      [name]:value
    });

    if ([event.target.name] ='sortBy') {
      var sortedResult = sortQuestions(event.target.value, this.state.allQuestions);
      console.log(this.state.questions);
      this.setState({allQuestions: sortedResult, paginationLowerLimit: 0, togglePagination: false, questions: sortedResult.slice(0,2)});
    }
  }

  getData(sortBy) {
    var url =`/api/getData${window.location.pathname}`;
    console.log(url);
    axios.get(url )
    .then((response) => {
      console.log(response.data.questions);
      this.setState({allQuestions:response.data.questions, questions: response.data.questions.slice(0,2) });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    console.log('I am in did mount');
    this.getData();
  }

  submitQuestion() {
    //do something
    //read teh content in the text box
    //send the question, screen name, date tot he server
    //inside the server update the product's question array with a new question based on the product ID

    var questions12 = Array.prototype.slice.call(this.state.questions);
    var questionId = questions12.length + 1;
    var question = this.state.question;
    var queScrNm = this.state.queScrNm;

    console.log('question', question);

    var queObj = {
      _id: questionId,
      questionId: questionId,
      question: question,
      createdBy: queScrNm,
      createdAt: today,
      answers: []
    };

    var newQuestions = [queObj];
    newQuestions = newQuestions.concat(questions12);

    this.setState({toggleQuestion: false, question: '',
    queScrNm: '', questions: newQuestions}, ()=>{console.log('question inside setstate', this.state)});

    axios.post(`/api/question${window.location.pathname}`, queObj)
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    })


  }



  render() {
    var questions = this.state.questions;
    var toggleQuestion = this.state.toggleQuestion;
    var handleQuestion = this.handleQuestion;
    var handleCancel = this.handleCancel;
    var submitQuestion = this.submitQuestion;
    var handleInputChange = this.handleInputChange;
    var handlePagination = this.handlePagination;
    var togglePagination = this.state.togglePagination;
    var style = togglePagination?  'btn red-btn-long' : 'btn red-btn';

    return (

        <div className = 'qa-parent'>
          <GlobalStyle/>
        <div className = 'qa-child'>
        <div className ='qa bold'> Q&A ({questions.length})</div>
        <div id="filterBox">
      <br></br>
      <label className="filterSorter">
        <b>Sort by</b>
        <select className="marginLeft" name="sortBy" onChange={(e) => {handleInputChange(e, 'sortBy')}}>
            <option className='white-btnans-btn' value='newestquestion'>newest question</option>
            <option className='white-btnans-btn'  value='newestanswer'>newest answer</option>
            <option className='white-btnans-btn'  value='fewestanswer'>fewest answer</option>
            <option className='white-btnans-btn'  value='mostanswer'>most answer</option>
        </select>
      </label>
      </div>
        <div>
            {questions.map((question) => (<Question question = {question} />))}
              {
                togglePagination? (<div className = 'pagination-cont'>
                                        <span className = 'pagination-left' onClick = {() => {handlePagination('first')}}>&lt;&lt;&lt;</span>
                                        <span className = 'pagination' onClick = {() => {handlePagination('previous')}}>&lt;</span>
                                        <span className = 'pagination' onClick = {() => {handlePagination('next')}}>&gt;</span>
                                        <span className = 'pagination' onClick = {() => {handlePagination('last')}}>&gt;&gt;&gt;</span>
                                  </div>)
                                  :
                                  (<button className='btn white-btn' onClick = {() => {handlePagination('togglePagination', 0)}} > Load more questions </button>)
              }

            <button className={style} onClick = {handleQuestion}>Ask a question</button>

            <div>{
              toggleQuestion? (<div> <AskQuestion handleInputChange={handleInputChange}  handleCancel={handleCancel} submitQuestion={submitQuestion} /></div>) : ''}
            </div>

         </div>
        </div>
      </div>

    );
  }
}


ReactDOM.render(<App />, document.getElementById('service2'));