var sortQuestions = (sortBy, questions) => {

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

