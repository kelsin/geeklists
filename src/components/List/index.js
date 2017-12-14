import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import map from 'ramda/src/map';
import moment from 'moment';
import Entry from '../Entry';

class List extends Component {
  render() {
    let slug = this.props.slug;
    let list = this.props.list;

    let entries = map(entry => (<Entry slug={slug} entry={entry}/>),
                      list.entries);

    return (
      <tbody>
        <tr key={list.id}>
          <td colSpan="6"><Link to={"/group/" + slug + "/geeklist/" + list.id}>{list.title}</Link></td>
        </tr>
        {entries}
      </tbody>
    );
  }
}

export default List;
