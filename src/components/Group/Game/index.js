import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import BGGLink from '../../BGGLink';
import Chart from '../../Chart';
import List from '../../List';
import PriceLink from '../../PriceLink';
import Rating from '../../Rating';

import compose from 'ramda/src/compose';
import descend from 'ramda/src/descend';
import map from 'ramda/src/map';
import pathOr from 'ramda/src/pathOr';
import prop from 'ramda/src/prop';
import sortWith from 'ramda/src/sortWith';
import values from 'ramda/src/values';

import { loadGroups, loadGroup, loadGroupGame } from '../../../store/actions/loading';

const getListsFromGame = compose(sortWith([descend(prop('year')),
                                           descend(prop('month'))]),
                                 values,
                                 pathOr([], ['geeklists']));

class Geeklist extends Component {
  componentDidMount() {
    let slug = this.props.match.params.slug;
    let id = this.props.match.params.id;
    let { loadGroups, loadGroup, loadGroupGame } = this.props;

    return loadGroups()
      .then(() => loadGroup(slug))
      .then(() => loadGroupGame(slug, id));
  }

  render() {
    let slug = this.props.match.params.slug;
    let id = this.props.match.params.id;
    let group = this.props.group;
    let game = pathOr({}, ['games', id], group);

    let getStat = stat => pathOr(0, ['games', id, 'stats', stat], group || {});

    let ratings = map(rating => (<Rating key={rating.id} slug={slug} rating={rating}/>), pathOr([], ['ratings'], game));

    let lists = map(list => (<List key={list.id} slug={slug} list={list}/>), getListsFromGame(game));

    return (
      <div className="group">
        <Link to={"/group/" + slug}>Back to {slug}</Link>
        <h2>{game && game.objectname} <BGGLink id={id}/> <PriceLink id={id}/></h2>
        <Chart stats={["entries", "users"]} geeklists={game.geeklists}/>
        <h3>Stats</h3>
        <dl>
          <dt>Entries</dt><dd>{getStat('entries')}</dd>
          <dt>Users</dt><dd>{getStat('users')}</dd>
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
            <tr><th>Date</th><th>User</th><th>Thumbs</th>
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
  loadGroupGame: compose(dispatch, loadGroupGame)
})

export default connect(mapStateToProps, mapDispatchToProps)(Geeklist);
