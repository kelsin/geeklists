import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BGGLink from '../BGGLink';

class Rating extends Component {
  render() {
    let slug = this.props.slug;
    let { geeklist_id, id, rating, objectid, objectname,
          username, summary } = this.props.rating;

    return (
      <tr key={id}>
        <td>{rating}</td>
        {username && <td>
            <Link to={"/group/" + slug + "/user/" + username}>{username}</Link>
            &nbsp;
            <BGGLink type="geeklist" id={`${geeklist_id}/item/${id}#item${id}`} />
        </td>}
        {objectid && <td>
            <Link to={"/group/" + slug + "/game/" + objectid}>{objectname}</Link>
            &nbsp;
            <BGGLink type="geeklist" id={`${geeklist_id}/item/${id}#item${id}`} />
        </td>}
        <td>{summary}</td>
      </tr>
    );
  }
}

export default Rating;
