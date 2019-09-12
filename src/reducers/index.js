import { combineReducers } from 'redux'
import authedUser from './authedUser'
import tabPosition from './tabPosition'
import questions from './questions'
import currentQuestion from './currentQuestion'


export default combineReducers({
    authedUser,
    tabPosition,
    questions,
    currentQuestion
  }) 