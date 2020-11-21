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
      bkpQuestions: [],
      toggleQuestion: false,
      question: '',
      queScrNm: '',
      sortBy: ''
    };
    this.handleQuestion = this.handleQuestion.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
    this.onChangeQue = this.onChangeQue.bind(this);
    this.onChangeQueScrNm = this.onChangeQueScrNm.bind(this);
    this.getData = this.getData.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
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

  onChangeFilter(e) {
    this.getData(e.target.value);
    this.setState({sortBy: e.target.value});
  }

  getData(sortBy) {
    var url =`http://localhost:3001${window.location.pathname}getData`;
    console.log(url);
    axios.get(url )
    .then((response) => {
      console.log(response.data.questions);
      this.setState({questions:response.data.questions});
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

    axios.post(`http://localhost:3001${window.location.pathname}question`, queObj)
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
    var question1 = this.state.question;
    var queScrNm = this.state.queScrNm;
    var handleQuestion = this.handleQuestion;
    var handleCancel = this.handleCancel;
    var submitQuestion = this.submitQuestion;
    var onChangeQue = this.onChangeQue;
    var onChangeQueScrNm = this.onChangeQueScrNm;
    var onChangeFilter = this.onChangeFilter;

    return (
      <div className = 'qa-parent'>
        <div className = 'qa-child'>
        <div className ='qa bold'> Q&A</div>
        <div id="filterBox">
      <br></br>
      <label className="filterSorter">
        <b>Sort by</b>
        <select className="marginLeft" name="sortBy" onChange={
        onChangeFilter}>
            <option className='white-btnans-btn' value='newestquestion'>newest question</option>
            <option className='white-btnans-btn'  value='newestanswer'>newest answer</option>
            <option className='white-btnans-btn'  value='fewestanswer'>fewest answer</option>
            <option className='white-btnans-btn'  value='mostanswer'>most answer</option>
        </select>
      </label>
      </div>
        <div>
          {questions.map((question) =>
           (<Question question = {question} />))}
          <button className='white-btn'>Load more questions</button>
          <button className='red-btn' onClick = {handleQuestion}>Ask a question</button>
          <div>{
            toggleQuestion? (<div> <AskQuestion question={question1} onChangeQue={onChangeQue} queScrNm={queScrNm} onChangeQueScrNm={onChangeQueScrNm} handleCancel={handleCancel} submitQuestion={submitQuestion} /></div>) : ''}
         </div>
         </div>
         </div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('service1'));