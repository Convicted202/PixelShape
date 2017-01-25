import './framescontainer.styl';

import React, { Component } from 'react';
import Frame from 'components/frame/Frame';

const Worker = require('worker!workers/generateGif.worker.js');

class FramesContainer extends Component {
  constructor (...args) {
    super(...args);

    this.initializeGifWorker();
    this.state = {
      frameAdded: false,
      fps: 2
    };
  }

  initializeGifWorker () {
    this.animationFrames = null;
    this.worker = new Worker();
    this.worker.addEventListener('message', event => {
      let gif = '';

      this.props.updateFrameGIFData(event.data.frameUUID, event.data.frameData);
      gif = this.getOrderedGif();
      this._gifImg.src = `data:image/gif;base64,${window.btoa(gif)}`;
    });
  }

  getOrderedGif () {
    return this.props.framesOrder.map(el => this.props.gifFramesData[el]).join('');
  }

  getFrames () {
    const collection = this.props.framesCollection;
    return this.props.framesOrder
      .map((uuid, index) => (
        <Frame
          key={uuid}
          uuid={uuid}
          height={this.props.imageSize.height}
          width={this.props.imageSize.width}
          isActive={uuid === this.props.currentUUID}
          index={index + 1}
          setActive={this.props.setCurrentFrame.bind(this, uuid)}
          imageData={collection[uuid].naturalImageData} />
      ));
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.modifiedFrames !== nextProps.modifiedFrames) {
      this.generateGif(
        nextProps.modifiedFrames,
        nextProps.framesCollection,
        nextProps.framesOrder,
        nextProps.imageSize.width,
        nextProps.imageSize.height,
        nextProps.fps
      );
    }
  }

  componentDidUpdate () {
    if (this.state.frameAdded) {
      this._addButton.scrollIntoView();
      this.setState({frameAdded: false});
    }
  }

  generateGif (
    modified = this.props.modifiedFrames,
    collection = this.props.framesCollection,
    order = this.props.framesOrder,
    width = this.props.imageSize.width,
    height = this.props.imageSize.height,
    fps = this.props.fps) {

    const gifLength = order.length;

    modified
      .forEach(frameObj => {
        const id = Object.keys(frameObj)[0];

        this.worker.postMessage({
          frameUUID: id,
          frameNum: frameObj[id],
          framesLength: gifLength,
          height: height,
          width: width,
          imageData: collection[id].naturalImageData.data,
          fps
        });
      });
  }

  addFrame () {
    this.props.addFrame(this.props.imageSize.width, this.props.imageSize.height);
    this.setState({ frameAdded: true });
  }

  render () {
    return (
      <div className="framescontainer">
        <div className="framescontainer__gif-container">
          <div className="framescontainer__gif">
            <img src="" ref={img => this._gifImg = img} />
            <span className="framescontainer__gif-fps">{this.props.fps}fps</span>
          </div>
        </div>
        <div className="framescontainer__frames">
          {this.getFrames()}
          <div
            className="framescontainer__frames-addframe"
            ref={b => this._addButton = b}
            onClick={this.addFrame.bind(this)}>
            <svg className="framescontainer__frames-addframe__icon" viewBox="0 0 24 24" width="40" height="40">
              <use xlinkHref="#plus"></use>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default FramesContainer;
