import './framebar.styl';

import React, { Component } from 'react';
import FrameButton from '../framebutton/Framebutton';
import FrameButtonBig from '../framebutton/Framebuttonbig';
import FramesContainer from '../../containers/framescontainer/Framescontainer';
import classNames from 'classnames';

import debounce from '../../utils/debounce';

class Framebar extends Component {

  constructor (...args) {
    super(...args);
    this.state = {
      fps: 2,
      maximized: true
    };
    this.setFPS = debounce(this.props.setFPS, 300);
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.fps !== nextProps.fps) this.setState({ fps: nextProps.fps });
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

  goLeft () {
    this.props.setCurrentFrame(this.props.previousFrameUUID);
  }

  goRight () {
    this.props.setCurrentFrame(this.props.nextFrameUUID);
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

  getMaximizedControls () {
    return [
      <div className="framebar__gif-controls" key="maxgifcontrols">
        <input
          className="framebar__gif-slider"
          ref={s => this._fpsSlider = s}
          type="range" step="1" min="1" max="24"
          value={this.state.fps}
          onChange={this.onChange.bind(this)} />
      </div>,

      <ul className="framebar__frames-controls" key="maxcontrols">
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
      </ul>,

      <div className="framebar__framename" key="maxframename">
        <input
          className="framebar__framename-input"
          ref={inp => this._nameInput = inp}
          key={this.props.currentFrameName}
          defaultValue={this.props.currentFrameName}
          onBlur={this.saveCurrentFrameName.bind(this)} />
      </div>
    ];
  }

  getMinimizedControls () {
    return [
      <div className="framebar__frame-counter" key="mincounter">
        <span>{ this.props.currentFrameIndex + 1 }</span> of <span>{ this.props.framesCount }</span>
      </div>,

      <ul className="framebar__frames-controls framebar__frames-controls-big" key="mincontrols">
        <FrameButtonBig
          btnTooltip="Go left"
          icon="left-min"
          doAction={this.goLeft.bind(this)} />
        <FrameButtonBig
          btnTooltip="Go right"
          icon="right-min"
          doAction={this.goRight.bind(this)} />
      </ul>
    ];
  }

  toggleMinimize () {
    this.setState({
      maximized: !this.state.maximized
    });
  }

  render () {
    const classes = classNames(
      'framebar',
      {
        'minimized': !this.state.maximized
      }
    );

    return (
      <aside className={classes} style={{display: this.props.visible ? 'block' : 'none'}}>
        <div className="framebar__controls">
          {
            this.state.maximized
              ? this.getMaximizedControls()
              : this.getMinimizedControls()
          }
          <div className="framebar__minimize">
            <div className="framebar__minimize-button" onClick={this.toggleMinimize.bind(this)}>
              { this.state.maximized ? 'Minimize' : 'Maximize' }
            </div>
          </div>
        </div>
        <FramesContainer
          hidden={!this.state.maximized} />
      </aside>
    );
  }
}

export default Framebar;
