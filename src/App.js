import React, { Component } from 'react';
import Loader from './components/Loader';
import Group from './components/Group';
import Game from './components/Group/Game';
import Geeklist from './components/Group/Geeklist';
import User from './components/Group/User';
import { Route } from 'react-router-dom';
import Nav from './components/Nav';

class App extends Component {
  render() {
    return (
      <div className="Geeklists">
        <Route path="/" component={Nav} />
        <Route exact path="/group/:slug" component={Group} />
        <Route exact path="/group/:slug/game/:id" component={Game} />
        <Route exact path="/group/:slug/geeklist/:id" component={Geeklist} />
        <Route exact path="/group/:slug/user/:username" component={User} />
        <Loader />
      </div>
    );
  }
}

export default App;
