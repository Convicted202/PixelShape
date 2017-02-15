import './surface.styl';

import React, { Component } from 'react';

import toolsMap from '../../modules/toolsMap';
import { disableImageSmoothing, drawGrid, resizeImageData } from '../../utils/canvasUtils';

const minPixelGridSize = 9,
      LEFT_CLICK = 0;

class Surface extends Component {
  constructor (...args) {
    super(...args);
    this.tool = toolsMap.get(this.props.tool);
  }

  applyAllContextInformation () {
    this.tool.applyState(Object.assign({}, this.props.toolSettings));
    this.tool.applyPixelSize(this.props.pixelSize);
    this.tool._assignRenderingContext(this.ctx);
    this.tool._assignBufferContext(this.buffer);
    this.tool._applyNaturalImageData(this.props.currentFrame.naturalImageData);
  }

  detectImageSizeChanged (props, changedProps) {
    return (props.imageSize.width !== changedProps.imageSize.width
      || props.imageSize.height !== changedProps.imageSize.height
      || props.pixelSize !== changedProps.pixelSize);
  }

  componentDidMount () {
    this.ctx = this._canvas.getContext('2d');
    this.buffer = this._buffer.getContext('2d');
    this.grid = this._grid.getContext('2d');
    this.applyAllContextInformation();
    disableImageSmoothing(this.ctx);
    disableImageSmoothing(this.buffer);
    drawGrid(this.grid, this.props.pixelSize | 0, 0.5);
  }

  componentDidUpdate (prevProps) {
    // new imageData has arrived with a new currentFrame -
    // need to apply to the surface
    const iData = resizeImageData(this.props.currentFrame.naturalImageData, this._canvas.width, this._canvas.height);
    // this.ctx.putImageData(this.props.currentFrame.imageData, 0, 0);
    this.ctx.putImageData(iData, 0, 0);
    this.tool._applyNaturalImageData(this.props.currentFrame.naturalImageData);
    // disable smoothing once again, in case we faced canvas resizing and smoothing is reset
    disableImageSmoothing(this.ctx);
    disableImageSmoothing(this.buffer);
    // redraw grid if imageSize changed
    if (this.detectImageSizeChanged(this.props, prevProps)) drawGrid(this.grid, this.props.pixelSize | 0, 0.5);
  }

  shouldShowGrid () {
    return this.props.gridShown && (this.props.pixelSize > minPixelGridSize);
  }

  updateFrameImageData () {
    this.props.updateFrameImageData(
      this.props.currentFrameUUID,
      this.tool._naturalImageData
    );
  }

  shouldComponentUpdate (nextProps) {
    // this is very important, since we are tracking currentFrame object
    // which is being changed all the time when framesContainer is updated
    // do not redraw component if currentFrame doesn't change
    if (this.detectImageSizeChanged(this.props, nextProps)) return true;
    if (this.props.projectGuid !== nextProps.projectGuid) return true;
    if (this.props.gridShown !== nextProps.gridShown) return true;
    if (this.props.currentFrameUUID === nextProps.currentFrameUUID) return false;
    return true;
  }

  normalizeEvent (ev) {
    this.boundRect = this._canvas.getBoundingClientRect();
    return [ev.clientX - this.boundRect.left, ev.clientY - this.boundRect.top];
  }

  onMouseDown (ev) {
    if (!this.isMouseLeftBtn(ev)) return;
    this.tool.storeCallback = this.props.setTempColor.bind(this);
    this.tool.onMouseDown(...this.normalizeEvent(ev));
  }

  mouseMoveOffBounds (ev) {
    if (this.isToolDrawing() && !this.isInBounds(ev)) {
      this.cancelMouseDown();
      this.updateFrameImageData();
    }
  }

  onMouseMove (ev) {
    this.mouseMoveOffBounds(ev);
    this.tool = toolsMap.get(this.props.tool);
    this.applyAllContextInformation();
    this.tool.onMouseMove(...this.normalizeEvent(ev));
  }

  onMouseUp (ev) {
    if (!this.isMouseLeftBtn(ev)) return;
    this.tool.onMouseUp(...this.normalizeEvent(ev));
    this.updateFrameImageData();
  }

  cancelMouseDown () {
    this.tool.cancelMouseDown();
  }

  isMouseLeftBtn (ev) {
    return ev.button === LEFT_CLICK;
  }

  isToolDrawing () {
    return this.tool.mouseDown;
  }

  isInBounds (ev) {
    return ev.target === this._buffer;
  }

  render () {
    return (
      <main
        className="surface"
        ref={s => this._surface = s}
        onMouseMove={this.onMouseMove.bind(this)}>
        <section
          className="surface__drawer"
          style={{width: this.props.surfaceWidth, height: this.props.surfaceHeight}}>
          <canvas
            className="grid-canvas"
            ref={c => this._grid = c}
            style={{display: this.shouldShowGrid() ? 'block' : 'none'}}
            height={this.props.surfaceHeight}
            width={this.props.surfaceWidth}>
          </canvas>
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
            onMouseUp={this.onMouseUp.bind(this)} >
          </canvas>
        </section>
      </main>
    );
  }
}

export default Surface;
