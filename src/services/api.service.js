import { _getUsers, _getQuestions, _saveQuestionAnswer } from '../mockup/_DATA'

export const apiService = {
  getUsers,
  getQuestions,
  getQuestionsAndUsers,
  saveAnswer
};


  function getUsers () {
    return _getUsers().then((users) => ({
      users
    }))
  }

  function getQuestions () {
    return _getQuestions().then((questions) => ({
      questions
    }))
  }
  
  function getQuestionsAndUsers () {
    return Promise.all([
      getQuestions(),
      getUsers(),
    ]).then(([questions, users]) => ({
      questions,
      users,
    }))
  }

  function saveAnswer (answeredQuestion ) {
    console.log(answeredQuestion);
    return _saveQuestionAnswer(answeredQuestion)
  }