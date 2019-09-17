import {userService} from '../services/user.service'
import { history } from '../helpers/history';
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
    return userService.login(username)
      .then(() =>{
        dispatch(setAuthedUser(username))
        dispatch(handleInitialData())
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

