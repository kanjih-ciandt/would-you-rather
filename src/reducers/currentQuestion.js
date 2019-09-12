import {  CURRENT_QUESTION } from '../actions/currentQuestion'

export default function loadQuestions (state = {}, action) {
  switch(action.type) {
    case CURRENT_QUESTION:
            return action.targetQuestion
    default:
        return state
    }
}


