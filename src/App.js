import React, { Component } from 'react';
import Loader from './components/Loader';
import Groups from './components/Groups';
import Group from './components/Group';
import User from './components/User';
import { Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="Geeklists">
        <nav>
        <ul><li><Link to="/">Home</Link></li></ul>
        </nav>

        <Route exact path="/" component={Groups} />
        <Route exact path="/group/:slug" component={Group} />
        <Route exact path="/group/:slug/user/:username" component={User} />
        <Loader />
      </div>
    );
  }
}

export default App;
