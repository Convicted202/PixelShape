import './framebar.styl';

import React, { Component } from 'react';
import FrameButton from 'components/framebutton/FrameButton';
import FramesContainer from 'containers/framescontainer/FramesContainer';

import debounce from 'utils/debounce';

class Framebar extends Component {

  constructor (...args) {
    super(...args);
    this.state = {
      fps: 2
    };
    this.setFPS = debounce(this.props.setFPS, 300);
  }

  removeCurrentFrame () {
    this.props.removeFrame(this.props.currentFrameUUID);
  }

  moveCurrentFrameRight () {
    this.props.moveFrameRight(this.props.currentFrameUUID);
  }

  moveCurrentFrameLeft () {
    this.props.moveFrameLeft(this.props.currentFrameUUID);
  }

  duplicateCurrentFrame () {
    this.props.duplicateFrame(this.props.currentFrameUUID);
  }

  onChange (ev) {
    // setting just state, to make slider movable
    this.setState({ fps: ev.target.value });
    // and then setting actual fps debounced to apply changes
    this.setFPS(ev.target.value);
  }

  saveCurrentFrameName () {
    this.props.updateFrameName(this.props.currentFrameUUID, this._nameInput.value);
  }

  render () {
    return (
      <aside className="framebar" style={{display: this.props.visible ? 'block' : 'none'}}>
        <div className="framebar__controls">
          <div className="framebar__gif-controls">
            <input
              className="framebar__gif-slider"
              ref={s => this._fpsSlider = s}
              type="range" step="1" min="1" max="24"
              value={this.state.fps}
              onChange={this.onChange.bind(this)} />
          </div>
          <ul className="framebar__frames-controls">
            <FrameButton
              btnTooltip="Duplicate"
              icon="duplicate"
              doAction={this.duplicateCurrentFrame.bind(this)} />
            <FrameButton
              btnTooltip="Remove"
              icon="remove"
              doAction={this.removeCurrentFrame.bind(this)} />
            <FrameButton
              btnTooltip="Move left"
              icon="move-left"
              doAction={this.moveCurrentFrameLeft.bind(this)} />
            <FrameButton
              btnTooltip="Move right"
              icon="move-right"
              doAction={this.moveCurrentFrameRight.bind(this)} />
          </ul>
          <div className="framebar__framename">
            <input
              className="framebar__framename-input"
              ref={inp => this._nameInput = inp}
              key={this.props.currentFrameName}
              defaultValue={this.props.currentFrameName}
              onBlur={this.saveCurrentFrameName.bind(this)} />
          </div>
        </div>
        <FramesContainer />
      </aside>
    );
  }
}

export default Framebar;
