import React, { Component } from 'react';
import config from '../config';

export default class GirlImage extends Component {
  render() {
    return (
      <div>
        <img src={config.rootPath + this.props.img.imageUrl} alt={this.props.img.title} />
        <h4>{this.props.img.title}</h4>
        <p>{this.props.img.description}</p>
      </div>
    )
  }
}
