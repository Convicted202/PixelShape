import './framescontainer.styl';

import React, { Component } from 'react';
import Frame from 'containers/frame/Frame';

import uniqueId from 'utils/uuid';

import {GIFEncoder, encode64} from 'libs/gif/index';

// require 'libs/gif.worker';
// require 'libs/gif';

class FramesContainer extends Component {
  constructor(...args) {
    super(...args);
    this.framePrefix = 'frame_';
    this.encoder = new GIFEncoder();
    this.encoder.setRepeat(0);
    this.encoder.setDelay(500);
    this.encoder.setSize(700, 700);
    this.encoder.setTransparent(0xffffff);
    this.state = {
      frameAdded: false,
      fps: 2
    };
  }

  componentWillMount() {
    const frame = this.createFrame();

    this.props.addFrame(frame);
    this.props.setCurrentFrame(frame.uuid);
  }

  getFrames() {
    const collection = this.props.framesCollection;

    this.sortedFrames =
      Object.keys(collection)
        .sort((frameUUID1, frameUUID2) => collection[frameUUID1].index - collection[frameUUID2].index);

    return this.sortedFrames
      .map((uuid, index) => (
        <Frame
          key={uuid}
          uuid={uuid}
          isActive={uuid === this.props.currentUUID}
          index={index + 1}
          originalIndex={collection[uuid].index}
          setActive={this.props.setCurrentFrame.bind(this, uuid)}
          imageData={collection[uuid].imageData} />
      ));
  }

  createFrame(index) {
    const uuid = uniqueId(this.framePrefix);
    let   frame = {};

    frame = {
      uuid,
      index: index || 0,
      name: `default_${index || 0}`,
      imageData: null
    };

    return frame;
  }

  componentDidUpdate() {
    if (this.state.frameAdded) {
      this._add_button.scrollIntoView();
      this.setState({
        frameAdded: false
      });
    }
  }

  generateGif() {
    const root = this;
    this.encoder.start();
    this.sortedFrames
      .forEach(uuid => root.encoder.addFrame(root.props.framesCollection[uuid].imageData.data, true));
    this.encoder.finish();
    const binary_gif = this.encoder.stream().getData();
    // console.log(`data:image/gif;base64,${encode64(binary_gif)}`);
  }

  addFrame() {
    const frame = this.createFrame(Object.keys(this.props.framesCollection).length);

    this.props.addFrame(frame);

    this.setState({
      frameAdded: true
    });
  }

  render() {
    return (
      <div className="framescontainer">
        <div className="framescontainer__gif-container">
          <div className="framescontainer__gif" onClick={this.generateGif.bind(this)}>
            <span className="framescontainer__gif-fps">{this.state.fps}fps</span>
          </div>
        </div>
        <div className="framescontainer__frames">
          {this.getFrames()}
          <div
            className="framescontainer__frames-addframe"
            ref={b => this._add_button = b}
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
