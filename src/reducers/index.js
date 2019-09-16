import { combineReducers } from 'redux'
import authedUser from './authedUser'
import tabPosition from './tabPosition'
import questions from './questions'
import currentQuestion from './currentQuestion'
import users from './users'


export default combineReducers({
    authedUser,
    tabPosition,
    questions,
    currentQuestion,
    users
  }) 