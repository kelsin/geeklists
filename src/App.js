import React, { Component } from 'react';
import Loader from './components/Loader';
import Groups from './components/Groups';
import Group from './components/Group';
import Game from './components/Group/Game';
import Geeklist from './components/Group/Geeklist';
import User from './components/Group/User';
import { Route, NavLink } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="Geeklists">
        <nav>
          <ul><li><NavLink exact to="/">Home</NavLink></li></ul>
        </nav>

        <Route exact path="/" component={Groups} />
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
