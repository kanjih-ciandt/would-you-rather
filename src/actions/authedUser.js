import {userService} from '../services/user.service'
import { history } from '../helpers/history';
import { showLoading, hideLoading } from 'react-redux-loading'

export const SET_AUTHED_USER = 'SET_AUTHED_USER'


export function setAuthedUser (authedUser) {
  return {
    type: SET_AUTHED_USER,
    authedUser,
  }
} 

export function login (username) {
  return (dispatch) => {
    dispatch(showLoading())
    return userService.login(username)
      .then(() =>{
        dispatch(setAuthedUser(username))
        dispatch(hideLoading())
        history.push('/')

      });
  }
} 

