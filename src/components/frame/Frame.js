import './frame.styl';

import React, { Component } from 'react';
import classNames from 'classnames';

class Frame extends Component {
  constructor(...args) {
    super(...args);
  }

  componentDidMount() {
    let freshImageData;
    this.context = this._fr_canvas.getContext('2d');
    freshImageData = this.context.getImageData(0, 0, this._fr_canvas.width, this._fr_canvas.height);
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
        <canvas height="700" width="700" ref={c => this._fr_canvas = c}></canvas>
      </div>
    )
  }
}

export default Frame;
