import { _getUsers, _getQuestions, _saveQuestionAnswer, _saveQuestion } from '../mockup/_DATA'

export const apiService = {
  getUsers,
  getQuestions,
  getQuestionsAndUsers,
  saveAnswer,
  saveQuestion
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
    return _saveQuestionAnswer(answeredQuestion)
  }

  function saveQuestion (newQuestion ) {
    return _saveQuestion(newQuestion)
  }