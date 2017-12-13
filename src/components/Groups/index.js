import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import map from 'ramda/src/map';

import { loadGroups } from '../../store/actions/loading';
import './index.css';

class Groups extends Component {
  componentDidMount() {
    this.props.loadGroups();
  }

  render() {
    let groups = map(group => (<li key={group.slug}><Link to={"/group/" + group.slug}>{group.name}</Link></li>), this.props.groups);
    return (
      <div className="groups">
        <ul>
          {groups}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  groups: state.groups
});

const mapDispatchToProps = dispatch => ({
  loadGroups: () => dispatch(loadGroups())
})

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
