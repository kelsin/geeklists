import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import BGGLink from '../BGGLink';

import compose from 'ramda/src/compose';
import descend from 'ramda/src/descend';
import map from 'ramda/src/map';
import prop from 'ramda/src/prop';
import sortWith from 'ramda/src/sortWith';
import values from 'ramda/src/values';

import { loadGroups, loadGroup } from '../../store/actions/loading';

const geeklistSort = sortWith([descend(prop('year')),
                               descend(prop('month'))]);

class Group extends Component {
  static defaultProps = {
    group: {
      geeklists: {}
    }
  };

  componentDidMount() {
    this.props.loadGroups().then(() => {
      this.props.loadGroup(this.props.match.params.slug);
    })
  }

  componentWillReceiveProps(nextProps) {
    let slug = this.props.match.params.slug;
    let nextSlug = nextProps.match.params.slug;

    if(slug !== nextSlug) {
      this.props.loadGroup(nextSlug);
    }
  }

  render() {
    let group = this.props.group;

    let lists = map(list => (
      <li key={list.id}>
        <Link to={"/group/" + group.slug + "/geeklist/" + list.id}>
          {list.title}
        </Link>
        &nbsp;
        <BGGLink type="geeklist" id={list.id}/>
      </li>
    ), geeklistSort(values(group.geeklists)));

    return (
      <div className="group">
        <h3>{group.name} <BGGLink type="thread" id={group.thread}/></h3>
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
