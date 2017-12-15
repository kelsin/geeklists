import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
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
        <NavLink className="nav__link" activeClassName="nav__link--active" to={"/group/" + group.slug}>
          {group.slug}
          <span className="nav__link-name">{group.name}</span>
        </NavLink>
      </li>
    ), this.props.groups);
    
    return (
      <nav className={this.props.open ? 'nav nav--open' : 'nav'}>
        <ul className="nav__list">
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));