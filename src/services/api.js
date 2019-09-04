import {
    _getUsers
  } from '../mockup/_DATA'


  export function getUsers () {
    return _getUsers().then((users) => ({
      users
    }))
  }