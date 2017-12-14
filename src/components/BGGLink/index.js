import React, { Component } from 'react';

import logo from '../../images/bgg.png';

class BGGLink extends Component {
  static defaultProps = {
    type: 'thing'
  };

  render() {
    let id = this.props.id;
    let type = this.props.type;

    return (
      <a target="_blank" href={`https://boardgamegeek.com/${type}/${id}`}>
        <img src={logo} alt="BGG Logo" />
      </a>
    );
  }
}

export default BGGLink;
