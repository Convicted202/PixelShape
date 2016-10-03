import './framescontainer.styl';

import React, { Component } from 'react';
import Frame from 'containers/frame/Frame';

const Worker = require('worker!workers/generateGif.worker.js');

class FramesContainer extends Component {
  constructor(...args) {
    super(...args);

    this.initializeGifWorker();
    this.state = {
      frameAdded: false,
      initialWorkerUpdate: true,
      fps: 2
    };
  }

  initializeGifWorker() {
    this.animationFrames = null;
    this.worker = new Worker();
    this.worker.addEventListener('message', event => {
      let gif = '', j;
      const length = this.animationFrames.length;

      this.animationFrames[event.data.frameIndex] = event.data.frameData;

      for (j = 0; j < length; j++) {
        if (!this.animationFrames[j]) return;
      }
      gif = this.animationFrames.join('');
      this._gif_img.src = `data:image/gif;base64,${window.btoa(gif)}`;

      this.props.updateGifFramesArray(this.animationFrames);
    });
  }

  componentWillMount() {
    this.props.addFrame();
  }

  getFrames() {
    const collection = this.props.framesCollection;

    return this.props.framesOrder
      .map((uuid, index) => (
        <Frame
          key={uuid}
          uuid={uuid}
          isActive={uuid === this.props.currentUUID}
          index={index + 1}
          setActive={this.props.setCurrentFrame.bind(this, uuid)}
          imageData={collection[uuid].imageData} />
      ));
  }

  // componentWillReceiveProps(nextProps) {
  //   // this.generateGif();
  // }

  componentDidUpdate() {
    if (this.state.frameAdded) {
      this._add_button.scrollIntoView();
      this.setState({frameAdded: false});
    }
    if (this.state.initialWorkerUpdate) {
      this.generateGif();
    }
  }

  generateGif() {
    const gifLength = this.props.framesOrder.length;

    this.animationFrames = new Array(gifLength);

    this.props.framesOrder
      .forEach((uuid, key) => {
        if (!this.props.framesCollection[uuid].imageData) return;
        this.worker.postMessage({
          frameNum: key,
          framesLength: gifLength,
          height: 700,
          width: 700,
          fps: this.props.fps,
          imageData: this.props.framesCollection[uuid].imageData.data
        });
      });
  }

  addFrame() {
    this.props.addFrame();
    this.setState({ frameAdded: true });
  }

  render() {
    return (
      <div className="framescontainer">
        <div className="framescontainer__gif-container">
          <div className="framescontainer__gif">
            <img src="" ref={img => this._gif_img = img} />
            <span className="framescontainer__gif-fps">{this.props.fps}fps</span>
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
