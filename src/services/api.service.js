import { _getUsers } from '../mockup/_DATA'

export const apiService = {
  getUsers
};


  function getUsers () {
    return _getUsers().then((users) => ({
      users
    }))
  }