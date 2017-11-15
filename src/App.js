import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './views/Dashboard/Dashboard'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Dashboard} />
      </Switch>
    );
  }
}

export default App;
