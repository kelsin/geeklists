import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import moment from 'moment';

import Entry from '../../Entry';
import BGGLink from '../../BGGLink';

import compose from 'ramda/src/compose';
import map from 'ramda/src/map';
import pathOr from 'ramda/src/pathOr';

import { loadGroups, loadGroup, loadGroupGeeklist } from '../../../store/actions/loading';

import './index.scss';

class Geeklist extends Component {
  componentDidMount() {
    let slug = this.props.match.params.slug;
    let id = this.props.match.params.id;
    let { loadGroups, loadGroup, loadGroupGeeklist } = this.props;

    return loadGroups()
      .then(() => loadGroup(slug))
      .then(() => loadGroupGeeklist(slug, id));
  }

  componentWillReceiveProps(nextProps) {
    let { match, loadGroup, loadGroupGeeklist } = this.props;
    let { slug, id } = match.params;

    if(slug !== nextProps.match.params.slug) {
      loadGroup(nextProps.match.params.slug);
    }

    if(slug !== nextProps.match.params.slug ||
       id !== nextProps.match.params.id) {
      loadGroupGeeklist(nextProps.match.params.slug,
                        nextProps.match.params.id);
    }
  }

  render() {
    let slug = this.props.match.params.slug;
    let id = this.props.match.params.id;
    let group = this.props.group;
    let geeklist = group.geeklists && group.geeklists[this.props.match.params.id];
    let updated_at = moment(geeklist && geeklist.updated_at).fromNow();
    let next_update_at_moment = moment(geeklist && geeklist.next_update_at);
    let next_update_at = next_update_at_moment.fromNow();
    if(next_update_at_moment.isBefore(moment())) {
      next_update_at = "soon";
    }

    let getStat = stat => pathOr(0, ['geeklists', id, 'stats', stat], group || {});

    let entries = map(entry => (<Entry key={entry.id} slug={slug} entry={entry}/>), pathOr([], ['entries'], geeklist));

    return (
      <div className="group">
        <Link to={"/group/" + slug}>Back to {slug}</Link>
        <h3>{geeklist && geeklist.title} <BGGLink type="geeklist" id={id}/></h3>
        <span className="updates">Last updated {updated_at}. Next update {next_update_at}.</span>
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
            <tr>
              <th>User</th>
              <th>Game</th>
              <th>Thumbs</th>
              <th>Summary</th>
              <th>Rating</th>
              <th>Date</th>
            </tr>
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
