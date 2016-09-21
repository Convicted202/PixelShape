import './frame.styl';

import React, { Component } from 'react';
import classNames from 'classnames';

class Frame extends Component {
  constructor(...args) {
    super(...args);
  }

  componentDidMount() {
    this.context = this._frcanvas.getContext('2d');
    const freshImageData = this.context.getImageData(0, 0, this._frcanvas.width, this._frcanvas.height);
    this.props.updateFrameImageData(this.props.uuid, freshImageData);
  }

  componentDidUpdate() {
    this.props.imageData && this.context.putImageData(this.props.imageData, 0, 0);
  }

  onClick() {
    this.props.setActive();
  }

  render() {
    const classes = classNames('frame', this.props.isActive ? 'active' : '');

    return (
      <div
        className={classes}
        onClick={this.onClick.bind(this)} >
        <span className="frame__index">{this.props.index}</span>
        <canvas height="700" width="700" ref={c => this._frcanvas = c}></canvas>
      </div>
    )
  }
}

export default Frame;
