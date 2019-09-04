import { getUsers } from '../services/api'
import { receiveUsers } from '../actions/users'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getUsers()
      .then(({ users}) => {
        dispatch(receiveUsers(users))
        dispatch(hideLoading())
      })
  }
} 