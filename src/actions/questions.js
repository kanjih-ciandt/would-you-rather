import {apiService} from '../services/api.service'

import { showLoading, hideLoading } from 'react-redux-loading'

export const LOAD_QUESTIONS = 'LOAD_QUESTIONS'

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
    dispatch(showLoading())
    return apiService.getQuestionsAndUsers()
      .then(({ questions, users }) => {
        const listQuestion = contentEnricher(questions, users)
        dispatch(returnQuestions(listQuestion))
        dispatch(hideLoading())
      });
  }
} 