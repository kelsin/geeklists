import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import BGGLink from '../BGGLink';

import ascend from 'ramda/src/ascend';
import compose from 'ramda/src/compose';
import map from 'ramda/src/map';
import prop from 'ramda/src/prop';
import sortWith from 'ramda/src/sortWith';
import values from 'ramda/src/values';

import { loadGroups } from '../../store/actions/loading';
import './index.css';

const groupSort = sortWith([ascend(prop('name'))]);

class Groups extends Component {
  componentDidMount() {
    this.props.loadGroups();
  }

  render() {
    let groups = map(group => (
      <li key={group.slug}>
        <Link to={"/group/" + group.slug}>{group.name}</Link>
        &nbsp;
        <BGGLink type="thread" id={group.thread}/>
      </li>
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
