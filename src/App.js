import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Login from './views/Dashboard/Login';
import Dashboard from './views/Dashboard/Dashboard';
import FightDetails from './views/FightDetails/FightDetails';
import CatFight from './views/CatFight/CatFight';
import Create from './views/Create/Create'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={Login} />
        <Route exact path='/' component={Dashboard} />
        <Route path='/fightdetails/:id' component={FightDetails} />
        <Route path='/catfight/:id' component={CatFight} />
        <Route path='/create' component={Create} />
      </Switch>
    );
  }
}

export default App;
