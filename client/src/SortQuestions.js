var sortQuestions = (sortBy, questions) => {

  console.log('I am here',sortBy);

  var sortedQuestions = questions.slice();

  if (sortBy === 'mostanswer') {
    //most Answered
    sortedQuestions.sort((a, b) => {
      if (a.answers.length > b.answers.length) {
        return -1;
      }
      if (a.answers.length < b.answers.length) {
        return 1;
      }
      return 0;
    });

  } else if (sortBy === 'fewestanswer') {
    //least Answered
    console.log('I am here');
    sortedQuestions.sort((a, b) => {
      if (a.answers.length < b.answers.length) {
        return -1;
      }
      if (a.answers.length > b.answers.length) {
        return 1;
      }
      return 0;
    });
  } else if (sortBy === 'newestquestion') {
    //recent Question
    sortedQuestions.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      return 0;
    });

  } else if (sortBy === 'newestanswer') {
    //recent Answer

    sortedQuestions.sort((a, b) => {
      console.log((a.answers[0].createAt > b.answers[0].createAt));
      if (a.answers[0].createAt > b.answers[0].createAt) {
        return -1;
      }
      if (a.answers[0].createAt < b.answers[0].createAt) {
        return 1;
      }
      return 0;
    });

  }

  return sortedQuestions;
}

export default sortQuestions;

