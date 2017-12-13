import React, { Component } from 'react';
import { connect } from 'react-redux';
import map from 'ramda/src/map';
import compose from 'ramda/src/compose';

import { loadGroupUser } from '../../store/actions/loading';

class User extends Component {
  componentDidMount() {
    let match = this.props.match;
    this.props.loadGroupUser(match.params.slug, match.params.username);
  }

  render() {
    let user = this.props.user;

    let ratings = map(rating => (
      <tr key={rating.id}>
        <td>
          {rating.rating}
        </td>
        <td>
          <a href={"https://boardgamegeek.com/thing/" + rating.objectid} target="_blank">{rating.objectname}</a>
        </td>
      </tr>
    ), user ? user.ratings : []);

    let lists = map(list => {
      let games = map(game => {
        return (
          <tr key={game.id}>
            <td>
              <a href={"https://boardgamegeek.com/thing/" + game.objectid} target="_blank">{game.objectname}</a>
            </td>
            <td>{game.thumbs}</td>
            <td>{game.rating}</td>
            <td>{game.summary}</td>
          </tr>
        );
      }, list.entries);

      return (
        <div className="list" key={list.geeklist_id}>
          <h5>{list.title}</h5>
          <table>
            <thead>
              <tr>
                <th>Game</th>
                <th>Thumbs</th>
                <th>Rating</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              {games}
            </tbody>
          </table>
        </div>
      );
    }, user ? user.entries : []);

    return (
      <div className="user">
        <h3>{user && user.username}</h3>
        <dl>
          <dt>Entries</dt><dd>{user && user.totals.entries}</dd>
          <dt>Games</dt><dd>{user && user.totals.games}</dd>
          <dt>Uniques</dt><dd>{user && user.totals.uniques}</dd>
          <dt>Summaries</dt><dd>{user && user.totals.summaries}</dd>
          <dt>Ratings</dt><dd>{user && user.totals.ratings}</dd>
        </dl>
        <h4>Ratings</h4>
        <table className="ratings">
          <tbody>
            {ratings}
          </tbody>
        </table>
        <h4>Lists</h4>
        {lists}
      </div>
    )
  }
}

const mapStateToProps = (state, {match}) => ({
  user: state.user[match.params.username]
});

const mapDispatchToProps = dispatch => ({
  loadGroupUser: compose(dispatch, loadGroupUser)
})

export default connect(mapStateToProps, mapDispatchToProps)(User);
