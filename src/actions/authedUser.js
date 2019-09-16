import {userService} from '../services/user.service'
import { history } from '../helpers/history';
import { showLoading, hideLoading } from 'react-redux-loading'
import { handleInitialData } from './shared'


export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const LOGOUT = 'LOGOUT'


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
        dispatch(handleInitialData())
        dispatch(hideLoading())
        history.push('/')

      });
  }
} 

export function cleanStore () {
  return {
    type: LOGOUT
  }
} 

export function logout () {
  return (dispatch) => {
    dispatch(cleanStore())
    history.push('/login')
  }
} 

