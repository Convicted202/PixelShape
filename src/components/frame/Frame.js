import './frame.styl';

import React, { Component } from 'react';
import classNames from 'classnames';

class Frame extends Component {
  constructor (...args) {
    super(...args);
  }

  componentDidMount () {
    let imageData;
    this.context = this._frcanvas.getContext('2d');
    // if statement most likely will only be used when user duplicates current frame
    if (this.props.imageData) this.forceUpdate();
    else {
      imageData = this.context.getImageData(0, 0, this._frcanvas.width, this._frcanvas.height);
      this.props.updateFrameImageData(this.props.uuid, imageData);
    }
  }

  componentDidUpdate () {
    if (this.props.imageData) this.context.putImageData(this.props.imageData, 0, 0);
  }

  render () {
    const classes = classNames(
      'frame',
      {
        'active': this.props.isActive
      });

    return (
      <div
        className={classes}
        onClick={this.props.setActive} >
        <span className="frame__index">{this.props.index}</span>
        <canvas
          height={this.props.height}
          width={this.props.width}
          ref={c => this._frcanvas = c}></canvas>
      </div>
    );
  }
}

export default Frame;
