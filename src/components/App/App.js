import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
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
        <Switch>
          <PrivateRoute path='/' exact component={() => <Dashboard tab={1} />}/>
          <PrivateRoute path='/answer' component={() => <Dashboard tab={0} />}/>
          <PrivateRoute path="/questions/:question_id"  component={Dashboard}/>
          <PrivateRoute path="/questions"  component={() => <Dashboard tab={1} />}/>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/add" component={() => <Dashboard tab={2} />}/>
          <PrivateRoute path="/leaderboard" component={() => <Dashboard tab={3} />}/>
          <PrivateRoute component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

function NoMatch({ location }) {
  return (
    <div>
      <h3>
        PAGE NOT FOUND!!! No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}



export default connect()(App);
