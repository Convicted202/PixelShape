import './framescontainer.styl';

import React, { Component } from 'react';
import Frame from 'containers/frame/Frame';

import uniqueId from 'utils/uuid';

const frames = [
  {name: ''},
  // {name: ''},
  // {name: ''}
];

class FramesContainer extends Component {
  constructor(...args) {
    super(...args);
    this.framePrefix = 'frame_';
    this.state = {
      frames,
      active: 0,
      fps: 2
    }
  }

  componentWillMount() {
    const frame = this.createFrame();

    this.props.addFrame(frame);
    this.props.setCurrentFrame(frame.uuid);
  }

  getFrames() {
    return Object.keys(this.props.framesCollection)
      .map((uuid, index) => (
        <Frame
          key={uuid}
          uuid={uuid}
          isActive={uuid === this.props.currentUUID}
          index={index + 1}
          originalIndex={this.props.framesCollection[uuid].index}
          setActive={this.props.setCurrentFrame.bind(this, uuid)}
          imageData={this.props.framesCollection[uuid].imageData} />
      ));
  }

  createFrame(index) {
    const uuid = uniqueId(this.framePrefix);
    let   frame = {};

    frame = {
      uuid,
      index: index || 0,
      name: 'default',
      imageData: null
    };

    return frame;
  }

  addFrame() {
    const frame = this.createFrame(Object.keys(this.props.framesCollection).length);

    this.props.addFrame(frame);
  }

  render() {
    return (
      <div className="framescontainer">
        <div className="framescontainer__gif-container">
          <div className="framescontainer__gif">
            <span className="framescontainer__gif-fps">{this.state.fps}fps</span>
          </div>
        </div>
        <div className="framescontainer__frames">
          {this.getFrames()}
          <div
            className="framescontainer__frames-addframe"
            onClick={this.addFrame.bind(this)}>
            <svg className="framescontainer__frames-addframe__icon" viewBox="0 0 24 24" width="40" height="40">
              <use xlinkHref="#plus"></use>
            </svg>
          </div>
        </div>
      </div>
    )
  }
}

export default FramesContainer;
