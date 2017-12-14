import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import map from 'ramda/src/map';
import values from 'ramda/src/values';
import compose from 'ramda/src/compose';
import descend from 'ramda/src/descend';
import sortWith from 'ramda/src/sortWith';
import prop from 'ramda/src/prop';

import { loadGroups, loadGroup } from '../../store/actions/loading';

const geeklistSort = sortWith([descend(prop('year')),
                               descend(prop('month'))]);

class Group extends Component {
  componentDidMount() {
    this.props.loadGroups()
      .then(() => this.props.loadGroup(this.props.match.params.slug));
  }

  render() {
    let group = this.props.group;

    let lists = map(list => (
      <li key={list.id}>
        <Link to={"/group/" + group.slug + "/geeklist/" + list.id}>
          {list.title}
        </Link>
      </li>
    ), geeklistSort(values(group.geeklists)));

    return (
      <div className="group">
        <h3>{this.props.group && this.props.group.slug}</h3>
        <ul>
          {lists}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, {match}) => ({
  group: state.groups[match.params.slug] || { geeklists: {} }
});

const mapDispatchToProps = dispatch => ({
  loadGroup: compose(dispatch, loadGroup),
  loadGroups: compose(dispatch, loadGroups)
})

export default connect(mapStateToProps, mapDispatchToProps)(Group);
