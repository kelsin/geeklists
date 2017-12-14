import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BGGLink from '../BGGLink';
import PriceLink from '../PriceLink';

import moment from 'moment';

class Entry extends Component {
  render() {
    let slug = this.props.slug;
    let entry = this.props.entry;

    return (
      <tr key={entry.id}>
        <td>{moment(entry.postdate).format("LLL")}</td>
        {entry.username &&
          <td>
            <Link to={"/group/" + slug + "/user/" + entry.username}>{entry.username}</Link>
            <BGGLink type="user" id={entry.username}/>
          </td>
        }
        {entry.objectid &&
          <td>
            <Link to={"/group/" + slug + "/game/" + entry.objectid}>{entry.objectname}</Link>
            <BGGLink id={entry.objectid}/>
            <PriceLink id={entry.objectid}/>
          </td>
        }
        <td>{entry.thumbs}</td>
        <td>{entry.summary}</td>
        <td>{entry.rating}</td>
      </tr>
    );
  }
}

export default Entry;
