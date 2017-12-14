import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import map from 'ramda/src/map';

import BGGLink from '../BGGLink';
import Entry from '../Entry';

class List extends Component {
  render() {
    let slug = this.props.slug;
    let list = this.props.list;

    let entries = map(entry => (<Entry key={entry.id} slug={slug} entry={entry}/>),
                      list.entries);

    return (
      <tbody>
        <tr key={list.id}>
          <td colSpan="6">
            <Link to={"/group/" + slug + "/geeklist/" + list.id}>{list.title}</Link>
            <BGGLink type="geeklist" id={list.id}/>
          </td>
        </tr>
        {entries}
      </tbody>
    );
  }
}

export default List;
