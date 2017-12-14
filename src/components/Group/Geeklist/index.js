import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Entry from '../../Entry';
import BGGLink from '../../BGGLink';

import compose from 'ramda/src/compose';
import map from 'ramda/src/map';
import pathOr from 'ramda/src/pathOr';

import { loadGroups, loadGroup, loadGroupGeeklist } from '../../../store/actions/loading';

class Geeklist extends Component {
  componentDidMount() {
    let slug = this.props.match.params.slug;
    let id = this.props.match.params.id;
    let { loadGroups, loadGroup, loadGroupGeeklist } = this.props;

    return loadGroups()
      .then(() => loadGroup(slug))
      .then(() => loadGroupGeeklist(slug, id));
  }

  render() {
    let slug = this.props.match.params.slug;
    let id = this.props.match.params.id;
    let group = this.props.group;
    let geeklist = group.geeklists && group.geeklists[this.props.match.params.id];

    let getStat = stat => pathOr(0, ['geeklists', id, 'stats', stat], group || {});

    let entries = map(entry => (<Entry key={entry.id} slug={slug} entry={entry}/>), pathOr([], ['entries'], geeklist));

    return (
      <div className="group">
        <Link to={"/group/" + slug}>Back to {slug}</Link>
        <h3>{geeklist && geeklist.title}</h3>
        <ul><li><BGGLink type="geeklist" id={id}/></li></ul>
        <dl>
          <dt>Entries</dt><dd>{getStat('entries')}</dd>
          <dt>Games</dt><dd>{getStat('games')}</dd>
          <dt>Users</dt><dd>{getStat('users')}</dd>
          <dt>Uniques</dt><dd>{getStat('uniques')}</dd>
          <dt>Summaries</dt><dd>{getStat('summaries')}</dd>
          <dt>Ratings</dt><dd>{getStat('ratings')}</dd>
        </dl>
        <table>
          <thead>
            <tr><th>Date</th><th>User</th><th>Item</th><th>Thumbs</th>
            <th>Summary</th><th>Rating</th></tr>
          </thead>
          <tbody>
            {entries}
          </tbody>
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
  loadGroupGeeklist: compose(dispatch, loadGroupGeeklist)
})

export default connect(mapStateToProps, mapDispatchToProps)(Geeklist);
