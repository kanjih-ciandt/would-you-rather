import { combineReducers } from 'redux'
import authedUser from './authedUser'
import tabPosition from './tabPosition'
import questions from './questions'
import currentQuestion from './currentQuestion'
import users from './users'


const appReducer =  combineReducers({
    authedUser,
    tabPosition,
    questions,
    currentQuestion,
    users
  }) 

  const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
      state = undefined
    }
  
    return appReducer(state, action)
  }


  export default rootReducer;