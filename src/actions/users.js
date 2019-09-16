import { showLoading, hideLoading } from 'react-redux-loading'
import {apiService} from '../services/api.service'

export const LOAD_USERS = 'LOAD_USERS'

function loadUsers (users) {
  return {
    type: LOAD_USERS,
    users,
  }
} 

export function handleLoadUsers(){
  return (dispatch) => {
    dispatch(showLoading())
    return apiService.getUsers()
      .then(({ users }) => {
        dispatch(loadUsers(users))
        dispatch(hideLoading())
      });
  }
}