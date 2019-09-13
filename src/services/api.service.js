import { _getUsers, _getQuestions } from '../mockup/_DATA'

export const apiService = {
  getUsers,
  getQuestions,
  getQuestionsAndUsers
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