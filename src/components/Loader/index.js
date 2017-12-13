import React, { Component } from 'react';
import { connect } from 'react-redux';

import grid from './grid.svg';
import './index.css';

class Loader extends Component {
  render() {
    return (
      <div className={"loader" + (this.props.loading ? ' loading' : '')}>
        <img src={grid} alt="loading" />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.loading > 0
});

export default connect(mapStateToProps)(Loader);
