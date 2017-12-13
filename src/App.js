import React, { Component } from 'react';
import Loader from './components/Loader';
import Groups from './components/Groups';

class App extends Component {
  render() {
    return (
      <div className="Geeklists">
        <Groups />
        <Loader />
      </div>
    );
  }
}

export default App;
