import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Loader from './Loader';
import Group from './Group';
import Game from './Group/Game';
import Geeklist from './Group/Geeklist';
import User from './Group/User';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div className="Geeklists">
        <Header />
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
