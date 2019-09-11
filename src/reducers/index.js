import { combineReducers } from 'redux'
import authedUser from './authedUser'
import tabPosition from './tabPosition'
// import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    authedUser,
    tabPosition
    
  }) 