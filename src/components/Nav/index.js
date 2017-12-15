import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import map from 'ramda/src/map';
import ascend from 'ramda/src/ascend';
import prop from 'ramda/src/prop';
import sortWith from 'ramda/src/sortWith';
import values from 'ramda/src/values';
import compose from 'ramda/src/compose';
import { loadGroups } from '../../store/actions/loading';

const groupSort = sortWith([ascend(prop('name'))]);

class Nav extends Component {
  static defaultProps = {
    groups: []
  }
  componentDidMount() {
    this.props.loadGroups();
  }

  render() {
    let groups = map(group => (
      <li className="nav__item nav__item--group" key={group.slug}>
        <NavLink className="nav__link" title={group.name} to={"/group/" + group.slug}>{group.slug}</NavLink>
      </li>
    ), this.props.groups);
    
    return (
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink className="nav__link" exact to="/">Home</NavLink>
          </li>
          {groups}
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  groups: groupSort(values(state.groups))
});

const mapDispatchToProps = dispatch => ({
  loadGroups: compose(dispatch, loadGroups)
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav);