import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Login from '../Login/Login'
import './App.css';

function App() {
  return (
    <Router>
      <Route path='/' exact component={Login} />
    </Router>
  );
}

export default App;
