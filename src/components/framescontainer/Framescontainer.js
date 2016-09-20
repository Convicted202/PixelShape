import './framescontainer.styl';

import React, { Component } from 'react';
import Frame from 'components/frame/Frame';

const frames = [
  {name: ''},
  // {name: ''},
  // {name: ''}
];

class FramesContainer extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      frames,
      active: 0,
      fps: 2
    }
  }

  getFrames() {
    return this.state.frames
      .map((frame, index) => (
        <Frame
          key={index}
          isActive={index === this.state.active}
          index={index + 1}
          setActive={this.setActiveFrame.bind(this, index)} />
      ));
  }

  setActiveFrame(index) {
    this.setState({
      active: index
    });
  }

  addFrame() {
    this.setState({
      frames: [...this.state.frames, {name: ''}]
    });
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
