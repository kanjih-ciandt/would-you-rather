import { combineReducers } from 'redux'
import authedUser from './authedUser'
import tabPosition from './tabPosition'
import questions from './questions'
import currentQuestion from './currentQuestion'
import users from './users'
import { loadingBarReducer } from 'react-redux-loading'


const appReducer =  combineReducers({
    authedUser,
    tabPosition,
    questions,
    currentQuestion,
    users,
    loadingBar: loadingBarReducer,
  }) 

  const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
      state = undefined
    }
  
    return appReducer(state, action)
  }


  export default rootReducer;