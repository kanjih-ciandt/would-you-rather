import React, { Component, Fragment } from 'react';
import { Router, Route } from 'react-router-dom'
import { history } from '../../helpers/history';
import Dashboard from '../Dashboard/Dashboard'
import { PrivateRoute }  from '../PrivateRouter/PrivateRouter'
import Login from '../Login/Login'
import './App.css';
import { connect } from 'react-redux'

class App extends Component {
  

  render() {

    return (
      <Router  history={history}>
        <Fragment>
          <PrivateRoute path='/' exact component={Dashboard} />
          <Route path="/login" component={Login} />
        </Fragment>
      </Router>
    );
  }
}



export default connect()(App);
