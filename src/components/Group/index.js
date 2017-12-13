import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import map from 'ramda/src/map';
import compose from 'ramda/src/compose';

import { loadGroup } from '../../store/actions/loading';

class Group extends Component {
  componentDidMount() {
    this.props.loadGroup(this.props.match.params.slug);
  }

  render() {
    let group = this.props.group;

    let lists = map(list => (
      <li key={list.id}>
        <Link to={"/group/" + group.slug + "/geeklist/" + list.id}>
          {list.title}
        </Link>
      </li>
    ), group ? group.geeklists : []);

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
  group: state.group[match.params.slug]
});

const mapDispatchToProps = dispatch => ({
  loadGroup: compose(dispatch, loadGroup)
})

export default connect(mapStateToProps, mapDispatchToProps)(Group);
