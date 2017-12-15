import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BGGLink from './BGGLink';
import PriceLink from './PriceLink';

import moment from 'moment';

class Entry extends Component {
  render() {
    let slug = this.props.slug;
    let entry = this.props.entry;

    return (
      <tr key={entry.id}>
        {entry.username &&
          <td>
            <Link to={"/group/" + slug + "/user/" + entry.username}>{entry.username}</Link>
            &nbsp;
            <BGGLink type="user" id={entry.username}/>
          </td>
        }
        {entry.objectid &&
          <td>
            <Link to={"/group/" + slug + "/game/" + entry.objectid}>{entry.objectname}</Link>
            &nbsp;
            <BGGLink id={entry.objectid}/>
            &nbsp;
            <PriceLink id={entry.objectid}/>
          </td>
        }
        <td>{entry.thumbs}</td>
        <td className="summary">{entry.summary}</td>
        <td>{entry.rating}</td>
        <td>
          {moment(entry.postdate).format("lll")}
          &nbsp;
          <BGGLink type="geeklist" id={`${entry.geeklist_id}/item/${entry.id}#item${entry.id}`} />
        </td>
      </tr>
    );
  }
}

export default Entry;
