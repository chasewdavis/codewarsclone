import React, { Component } from 'react';
import logo from './logo.svg';
import './utilities/reset.css';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Login from './views/Dashboard/Login';
import Dashboard from './views/Dashboard/Dashboard';
import FightDetails from './views/FightDetails/FightDetails';
import CatFight from './views/CatFight/CatFight';
import Create from './views/Create/Create';
import Search from './views/Search/Search';
// will remove instructions after testing
import Instructions from './components/TabContainer/Instructions/Instructions';
import SlateExample from './components/TabContainer/Instructions/SlateExample/SlateExample';
import Profile from './views/Profile/Profile';


class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={Login} />
        <Route exact path='/' component={Dashboard} />
        <Route path='/fightdetails/:id' component={FightDetails} />
        <Route path='/catfight/:id' component={CatFight} />
        <Route path='/create' component={Create} />
        <Route path='/search' component={Search}/>
        {/* will remove /edit + instructions after testing */}
        <Route path='/edit' component={Instructions} />
        <Route path='/example' component={SlateExample} />
        <Route path="/profile" component={Profile} />
      </Switch>
    );
  }
}

export default App;
