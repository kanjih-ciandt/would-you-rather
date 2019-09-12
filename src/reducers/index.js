import { combineReducers } from 'redux'
import authedUser from './authedUser'
import tabPosition from './tabPosition'
import questions from './questions'


export default combineReducers({
    authedUser,
    tabPosition,
    questions
    
    
  }) 