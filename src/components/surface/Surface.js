import './surface.styl';

import React, { Component } from 'react';

import toolsMap from 'modules/toolsMap';

class Surface extends Component {
  constructor (...args) {
    super(...args);
    this.tool = toolsMap.get(this.props.tool);
  }

  applyAllContextInformation () {
    this.tool.applyState(Object.assign({}, this.props.toolSettings, { pixelSize: this.props.pixelSize }));
    this.tool._assignRenderingContext(this.ctx);
    this.tool._assignBufferContext(this.buffer);
  }

  componentDidMount () {
    this.ctx = this._canvas.getContext('2d');
    this.buffer = this._buffer.getContext('2d');
    this.applyAllContextInformation();
  }

  componentDidUpdate () {
    // new imageData has arrived with a new currentFrame -
    // need to apply to the surface
    this.ctx.putImageData(this.props.currentFrame.imageData, 0, 0);
  }

  updateFrameImageData () {
    this.props.updateFrameImageData(
      this.props.currentFrameUUID,
      this.ctx.getImageData(0, 0, this._canvas.width, this._canvas.height)
    );
  }

  shouldComponentUpdate (nextProps) {
    // this is very important, since we are tracking currentFrame object
    // which is being changed all the time when framesContainer is updated
    // do not redraw component if currentFrame doesn't change
    if (this.props.surfaceWidth !== nextProps.surfaceWidth
      || this.props.surfaceHeight !== nextProps.surfaceHeight) return true;
    if (this.props.currentFrameUUID === nextProps.currentFrameUUID) return false;
    return true;
  }

  normalizeEvent (ev) {
    this.boundRect = this._canvas.getBoundingClientRect();
    return [ev.clientX - this.boundRect.left, ev.clientY - this.boundRect.top];
  }

  onMouseDown (ev) {
    this.tool = toolsMap.get(this.props.tool);
    this.tool.storeCallback = this.props.setTempColor.bind(this);
    this.tool.onMouseDown(...this.normalizeEvent(ev));
  }

  onMouseMove (ev) {
    // TODO: reorganize this later (put in external module)
    // this could be moved to componentWillReceiveProps
    this.tool = toolsMap.get(this.props.tool);
    this.applyAllContextInformation();
    this.tool.onMouseMove(...this.normalizeEvent(ev));
  }

  onMouseUp (ev) {
    this.tool.onMouseUp(...this.normalizeEvent(ev));
    this.updateFrameImageData();
  }

  render () {
    return (
      <main className="surface" ref={s => this._surface = s}>
        <section className="surface__drawer" style={{width: this.props.surfaceWidth, height: this.props.surfaceHeight}}>
          <canvas
            className="main-rendering-canvas"
            ref={c => this._canvas = c}
            height={this.props.surfaceHeight}
            width={this.props.surfaceWidth}>
          </canvas>
          <canvas
            className="buffer-canvas"
            ref={c => this._buffer = c}
            height={this.props.surfaceHeight}
            width={this.props.surfaceWidth}
            onMouseDown={this.onMouseDown.bind(this)}
            onMouseMove={this.onMouseMove.bind(this)}
            onMouseUp={this.onMouseUp.bind(this)} >
          </canvas>
        </section>
      </main>
    );
  }
}

export default Surface;
