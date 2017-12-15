import React, { Component } from 'react';

import List from './List';

import compose from 'ramda/src/compose';
import complement from 'ramda/src/complement';
import isNil from 'ramda/src/isNil';
import map from 'ramda/src/map';
import path from 'ramda/src/path';

const hasUser = compose(complement(isNil), path([0, 'entries', 0, 'username']));
const hasGame = compose(complement(isNil), path([0, 'entries', 0, 'objectid']));

class Entries extends Component {
  static defaultProps = {
    geeklists: [],
    slug: undefined
  };

  render() {
    let slug = this.props.slug;
    let geeklists = this.props.geeklists;

    let lists = map(list => <List key={list.id} slug={slug} list={list} />,
                    geeklists);

    return (
      <div className="entries">
        <h3>Entries</h3>
        <table>
          <thead>
            <tr>
              {hasUser(geeklists) && <th>User</th>}
              {hasGame(geeklists) && <th>Game</th>}
              <th>Thumbs</th>
              <th>Summary</th>
              <th>Rating</th>
              <th>Date</th>
            </tr>
          </thead>
          {lists}
        </table>
      </div>
    );
  }
}

export default Entries;
