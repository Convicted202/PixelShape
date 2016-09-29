import './framebar.styl';

import React, { Component } from 'react';
import FrameButton from 'components/framebutton/FrameButton';
import FramesContainer from 'containers/framescontainer/FramesContainer';

import uniqueId from 'utils/uuid';
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

  updateIndexes(newFrameUUID, action) {
    const collection = this.props.framesCollection,
          shift = action === 'remove' ? -1 : 1;

    Object.keys(collection)
      .forEach(frameUUID => {
        if (collection[frameUUID].index > collection[newFrameUUID].index) {
          this.props.updateFrameIndex(frameUUID, collection[frameUUID].index + shift);
        }
      });
  }

  removeCurrentFrame() {
    const currentUUID = this.props.currentFrameUUID,
          currentFrameIndex = this.props.framesCollection[currentUUID].index,
          col = this.props.framesCollection,
          nextFrame = Object.keys(col)
                        .find(el => {
                          if (el === this.props.currentFrameUUID) return false;
                          // first try taking the frame to the left if exists and then to the right
                          if (currentFrameIndex - col[el].index === 1) return true;
                          if (col[el].index - currentFrameIndex === 1) return true;
                        });

    // no nextFrame means we have sole frame in the collection
    if (!nextFrame) return;
    this.updateIndexes(currentUUID, 'remove');
    this.props.setCurrentFrame(nextFrame);
    this.props.removeFrame(currentUUID);
  }

  moveCurrentFrameRight() {
    this.moveCurrentFrame('right');
  }

  moveCurrentFrameLeft() {
    this.moveCurrentFrame('left');
  }

  moveCurrentFrame(direction) {
    const shift = direction === 'right' ? 1 : -1,
          currentUUID = this.props.currentFrameUUID,
          currentFrameIndex = this.props.framesCollection[currentUUID].index,
          col = this.props.framesCollection,
          nextFrame = Object.keys(col)
                        .find(el => {
                          if (el === this.props.currentFrameUUID) return false;
                          if (col[el].index - currentFrameIndex === shift) return true;
                        });

    if(!nextFrame) return;
    this.props.updateFrameIndex(currentUUID, col[currentUUID].index + shift);
    this.props.updateFrameIndex(nextFrame, col[nextFrame].index - shift);
  }

  duplicateCurrentFrame() {
    const uuid = uniqueId(this.framePrefix),
          currentUUID = this.props.currentFrameUUID,
          collection = this.props.framesCollection,
          currentImageData = collection[currentUUID].imageData;
    let   frame = {}, imageData = null, dataCopy = null;

    imageData = new ImageData(currentImageData.width, currentImageData.height);
    dataCopy = new Uint8ClampedArray(currentImageData.data);
    imageData.data.set(dataCopy);

    frame = {
      uuid,
      index: collection[currentUUID].index + 1,
      name: 'default',
      imageData
    };

    this.props.addFrame(frame);
    this.updateIndexes(currentUUID, 'add');
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
