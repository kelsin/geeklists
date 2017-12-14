import React, { Component } from 'react';

import money from '../../images/money.png';

const url = "http://www.spielboy.com/GeekPrices.php?gameID=";

class PriceLink extends Component {
  render() {
    let id = this.props.id;
    return (
      <a target="_blank" href={url + id}>
        <img src={money} alt="Game Value" />
      </a>
    );
  }
}

export default PriceLink;
