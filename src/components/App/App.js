import React, { Component, Fragment } from 'react';
import { Router, Route } from 'react-router-dom'
import { history } from '../../helpers/history';
import Dashboard from '../Dashboard/Dashboard'
import { PrivateRoute }  from '../PrivateRouter/PrivateRouter'
import Login from '../Login/Login'
import './App.css';
import { connect } from 'react-redux'
import { handleInitialData } from '../../actions/shared'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

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

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
