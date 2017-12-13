import React, { Component } from 'react';

class Image extends Component {
  render() {
    let size = this.props.size ? "_" + this.props.size : "";
    let id = this.props.id;
    return (
      <img alt="BoardGameGeek image" src={"https://cf.geekdo-images.com/images/pic" + id + size + ".png"} />
    );
  }
}

export default Image;
