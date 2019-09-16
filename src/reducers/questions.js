import { LOAD_QUESTIONS, ANSWER_QUESTION } from '../actions/questions'

export default function loadQuestions (state = {}, action) {
  switch(action.type) {
    case LOAD_QUESTIONS:
        return {
            ...state,
            ...action.questions
        }
    case ANSWER_QUESTION:
        return {
            ...state,
            ...action.questionAnswered
        }
    default:
        return state
    }
}


