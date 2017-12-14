import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import map from 'ramda/src/map';
import compose from 'ramda/src/compose';
import values from 'ramda/src/values';
import ascend from 'ramda/src/ascend';
import sortWith from 'ramda/src/sortWith';
import prop from 'ramda/src/prop';

import { loadGroups } from '../../store/actions/loading';
import './index.css';

const groupSort = sortWith([ascend(prop('name'))]);

class Groups extends Component {
  componentDidMount() {
    this.props.loadGroups();
  }

  render() {
    let groups = map(group => (
      <li key={group.slug}><Link to={"/group/" + group.slug}>{group.name}</Link></li>
    ), this.props.groups);

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
  groups: groupSort(values(state.groups))
});

const mapDispatchToProps = dispatch => ({
  loadGroups: compose(dispatch, loadGroups)
})

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
