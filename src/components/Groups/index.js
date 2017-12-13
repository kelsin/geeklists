import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadGroups } from '../../store/actions/loading';

class Loader extends Component {
  componentDidMount() {
    this.props.loadGroups();
  }

  render() {
    return (
      <div className="groups" />
    )
  }
}

const mapStateToProps = state => ({
  groups: state.groups
});

const mapDispatchToProps = dispatch => ({
  loadGroups: () => dispatch(loadGroups())
})

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
