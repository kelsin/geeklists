import React, { Component } from 'react';

class BGGLink extends Component {
  render() {
    let id = this.props.id;
    let name = this.props.name;
    return <a target="_blank" href={"https://boardgamegeek.com/thing/" + id}>{name}</a>;
  }
}

export default BGGLink;
