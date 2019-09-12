import { LOAD_QUESTIONS } from '../actions/questions'

export default function loadQuestions (state = {}, action) {
  switch(action.type) {
    case LOAD_QUESTIONS:
        return {
            ...state,
            ...action.questions
        }
    default:
        return state
    }
}

