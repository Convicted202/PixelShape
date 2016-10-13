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
    let imageData;
    if (this.props.imageData) this.context.putImageData(this.props.imageData, 0, 0);
    // if something influenced on image dimensions - update imageData in store
    // TODO: reconsider this in future when scaling is to be implemented
    if (this.props.imageData.width !== this._frcanvas.width || this.props.imageData.height !== this._frcanvas.height) {
      imageData = this.context.getImageData(0, 0, this._frcanvas.width, this._frcanvas.height);
      this.props.updateFrameImageData(this.props.uuid, imageData);
    }
  }

  render () {
    const classes = classNames('frame', this.props.isActive ? 'active' : '');

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
