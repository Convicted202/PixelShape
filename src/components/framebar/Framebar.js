import './framebar.styl';

import React, { Component } from 'react';
import FrameButton from 'components/framebutton/FrameButton';
import FramesContainer from 'containers/framescontainer/FramesContainer';

import debounce from 'utils/debounce';

class Framebar extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      fps: 2
    }
    this.framePrefix = 'frame_';
    this.setFPS = debounce(this.props.setFPS, 300);
  }

  removeCurrentFrame() {
    this.props.removeFrame(this.props.currentFrameUUID);
  }

  moveCurrentFrameRight() {
    this.props.moveFrameRight(this.props.currentFrameUUID);
  }

  moveCurrentFrameLeft() {
    this.props.moveFrameLeft(this.props.currentFrameUUID);
  }

  duplicateCurrentFrame() {
    this.props.duplicateFrame(this.props.currentFrameUUID);
  }

  onChange(ev) {
    // setting just state, to make slider movable
    this.setState({ fps: ev.target.value });
    // and then setting actual fps debounced to apply changes
    this.setFPS(this.state.fps);
  }

  saveCurrentFrameName() {
    this.props.updateFrameName(this.props.currentFrameUUID, this._name_input.value);
  }

  componentDidUpdate() {
    this._name_input.value = this.props.currentFrameName;
  }

  render() {
    return (
      <aside className="framebar">
        <div className="framebar__controls">
          <div className="framebar__gif-controls">
            <input
              className="framebar__gif-slider"
              ref={s => this._fps_slider = s}
              type="range" step="1" min="1" max="24"
              value={this.state.fps}
              onChange={this.onChange.bind(this)} />
          </div>
          <ul className="framebar__frames-controls">
            <FrameButton
              icon="duplicate"
              doAction={this.duplicateCurrentFrame.bind(this)} />
            <FrameButton
              icon="remove"
              doAction={this.removeCurrentFrame.bind(this)} />
            <FrameButton
              icon="move-left"
              doAction={this.moveCurrentFrameLeft.bind(this)} />
            <FrameButton
              icon="move-right"
              doAction={this.moveCurrentFrameRight.bind(this)} />
          </ul>
          <div className="framebar__framename">
            <input
              className="framebar__framename-input"
              ref={inp => this._name_input = inp}
              onBlur={this.saveCurrentFrameName.bind(this)} />
          </div>
        </div>
        <FramesContainer />
      </aside>
    )
  }
}

export default Framebar;
