import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Rating extends Component {
  render() {
    let slug = this.props.slug;
    let { id, rating, objectid, objectname,
          username, summary } = this.props.rating;

    return (
      <tr key={id}>
        <td>{rating}</td>
        {username && <td><Link to={"/group/" + slug + "/user/" + username}>{username}</Link></td>}
        {objectid && <td><Link to={"/group/" + slug + "/game/" + objectid}>{objectname}</Link></td>}
        <td>{summary}</td>
      </tr>
    );
  }
}

export default Rating;
