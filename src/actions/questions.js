import {apiService} from '../services/api.service'
import { setCurrentQuestion } from './currentQuestion';
import { handleLoadUsers } from './users';
import { showLoading, hideLoading } from 'react-redux-loading'

export const LOAD_QUESTIONS = 'LOAD_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function returnQuestions (questions) {
  return {
    type: LOAD_QUESTIONS,
    questions,
  }
} 


function contentEnricher(listQuestion, listUsers) {
  
  Object.values(listQuestion.questions).forEach(element => {
      const user = Object.values(listUsers.users).filter(user => user.id === element.author);
      element.authorUser = user[0];
    });

    return listQuestion;
}

export function loadQuestions () {
  return (dispatch) => {
    return apiService.getQuestionsAndUsers()
      .then(({ questions, users }) => {
        const listQuestion = contentEnricher(questions, users)
        dispatch(returnQuestions(listQuestion))
      });
  }
} 

function answerQuestion (questionAnswered) {
  return {
    type: ANSWER_QUESTION,
    questionAnswered
  }
}

export function handleAnswerQuestion (qid, answer) {
  return (dispatch, getState) => {
    const { authedUser} = getState()

    const questionAnswered = {
      authedUser:authedUser.id,
      qid,
      answer,
    }
    dispatch(showLoading())
    return apiService.saveAnswer(questionAnswered)
      .then(() => dispatch(answerQuestion(questionAnswered)))
      .then(() => dispatch(loadQuestions()))
      .then(() => {
          const { questions} = getState()
          dispatch(setCurrentQuestion(questions.questions[qid]))
        })
      .then(() =>dispatch(handleLoadUsers()))
      .then(() => dispatch(hideLoading()))
  }
}

function aAddQuestion (newQuestion) {
  return {
    type: ADD_QUESTION,
    newQuestion
  }
}
export function handleAddQuestion (newQuestion) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    return apiService.saveQuestion(newQuestion)
      .then(() => dispatch(aAddQuestion(newQuestion)))
      .then(() => dispatch(loadQuestions()))
      .then(() =>dispatch(handleLoadUsers()))
      .then(() => dispatch(hideLoading()))
  }
}