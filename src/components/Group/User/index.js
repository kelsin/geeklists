import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BGGLink from '../../BGGLink';
import Rating from '../../Rating';
import List from '../../List';
import map from 'ramda/src/map';
import values from 'ramda/src/values';
import compose from 'ramda/src/compose';
import descend from 'ramda/src/descend';
import sortWith from 'ramda/src/sortWith';
import prop from 'ramda/src/prop';
import pathOr from 'ramda/src/pathOr';
import moment from 'moment';

import { loadGroups, loadGroup, loadGroupUser } from '../../../store/actions/loading';

const getListsFromUser = compose(sortWith([descend(prop('year')),
                                           descend(prop('month'))]),
                                 values,
                                 pathOr([], ['geeklists']));

class User extends Component {
  componentDidMount() {
    let slug = this.props.match.params.slug;
    let username = this.props.match.params.username;
    let { loadGroups, loadGroup, loadGroupUser } = this.props;

    return loadGroups()
      .then(() => loadGroup(slug))
      .then(() => loadGroupUser(slug, username));
  }

  render() {
    let slug = this.props.match.params.slug;
    let username = this.props.match.params.username;
    let group = this.props.group;
    let user = pathOr({}, ['users', username], group);

    let getStat = stat => pathOr(0, ['users', username, 'stats', stat], group || {});

    let ratings = map(rating => (<Rating slug={slug} rating={rating}/>), pathOr([], ['ratings'], user));

    let lists = map(list => (<List slug={slug} list={list}/>), getListsFromUser(user));

    return (
      <div className="group">
        <Link to={"/group/" + slug}>Back to {slug}</Link>
        <h2>{username}</h2>
        <h3>Stats</h3>
        <dl>
          <dt>Entries</dt><dd>{getStat('entries')}</dd>
          <dt>Games</dt><dd>{getStat('games')}</dd>
          <dt>Uniques</dt><dd>{getStat('uniques')}</dd>
          <dt>Summaries</dt><dd>{getStat('summaries')}</dd>
          <dt>Ratings</dt><dd>{getStat('ratings')}</dd>
        </dl>
        <h3>Ratings</h3>
        <table>
          <thead>
            <tr>
              <th>Rating</th><th>Item</th><th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {ratings}
          </tbody>
        </table>
        <h3>Entries</h3>
        <table>
          <thead>
            <tr><th>Date</th><th>User</th><th>Item</th><th>Thumbs</th>
            <th>Summary</th><th>Rating</th></tr>
          </thead>
          {lists}
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state, {match}) => ({
  group: state.groups[match.params.slug] || { geeklists: {} }
});

const mapDispatchToProps = dispatch => ({
  loadGroups: compose(dispatch, loadGroups),
  loadGroup: compose(dispatch, loadGroup),
  loadGroupUser: compose(dispatch, loadGroupUser)
})

export default connect(mapStateToProps, mapDispatchToProps)(User);
