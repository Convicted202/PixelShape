import './surface.styl';

import React, { Component } from 'react';

import toolsMap from 'modules/toolsMap';

class Surface extends Component {
  constructor(...args) {
    super(...args);
    this.tool = toolsMap.get(this.props.tool);
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
  }

  onMouseUp(ev) {
    this.tool.onMouseUp(...this.normalizeEvent(ev));
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
