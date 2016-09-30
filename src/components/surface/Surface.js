import './surface.styl';

import React, { Component } from 'react';

import toolsMap from 'modules/toolsMap';
// import debounce from 'utils/debounce';

class Surface extends Component {
  constructor(...args) {
    super(...args);
    this.tool = toolsMap.get(this.props.tool);
    // this.debouncedUpdateFrameImageData = debounce(
    //   () => {
    //     this.updateFrameImageData();
    //   }, 500);
  }

  applyAllContextInformation() {
    this.tool.applyState(this.props.toolSettings);
    this.tool._assignRenderingContext(this.ctx);
    this.tool._assignBufferContext(this.buffer);
  }

  componentDidMount() {
    this.ctx = this._canvas.getContext('2d');
    this.buffer = this._buffer.getContext('2d');
    this.applyAllContextInformation();
  }

  componentDidUpdate() {
    this.tool = toolsMap.get(this.props.tool);
    this.applyAllContextInformation();
    this.tool.storeCallback = this.props.setTempColor.bind(this);
    if (this.props.currentFrame.imageData) {
      this.ctx.putImageData(this.props.currentFrame.imageData, 0, 0);
    }
  }

  updateFrameImageData() {
    this.props.updateFrameImageData(
      this.props.currentFrameUUID,
      this.ctx.getImageData(0, 0, this._canvas.width, this._canvas.height)
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    // this is very important, since we are tracking currentFrame object
    // which is being changed all the time when framesContainer is updated
    // render will be triggered one useless time, and slow performance
    if (this.props.currentFrameUUID === nextProps.currentFrameUUID) return false;
    return true;
  }

  normalizeEvent(ev) {
    this.boundRect = this._canvas.getBoundingClientRect();
    return [ev.clientX - this.boundRect.left, ev.clientY - this.boundRect.top]
  }

  onMouseDown(ev) {
    this.tool.onMouseDown(...this.normalizeEvent(ev));
  }

  onMouseMove(ev) {
    this.tool.onMouseMove(...this.normalizeEvent(ev));
    // this.debouncedUpdateFrameImageData();
  }

  onMouseUp(ev) {
    this.tool.onMouseUp(...this.normalizeEvent(ev));
    this.updateFrameImageData();
  }

  render() {
    return (
      <main className="surface">
        <section className="surface__drawer">
          <canvas
            className="main-rendering-canvas"
            ref={c => this._canvas = c}
            height="700"
            width="700">
          </canvas>
          <canvas
            className="buffer-canvas"
            ref={c => this._buffer = c}
            height="700"
            width="700"
            onMouseDown={this.onMouseDown.bind(this)}
            onMouseMove={this.onMouseMove.bind(this)}
            onMouseUp={this.onMouseUp.bind(this)} >
          </canvas>
        </section>
      </main>
    )
  }
}

export default Surface;
