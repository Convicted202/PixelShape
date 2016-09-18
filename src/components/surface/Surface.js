import './surface.styl';

import React, { Component } from 'react';

import toolsMap from 'modules/toolsMap';

class Surface extends Component {
  constructor(...args) {
    super(...args);
    this.tool = toolsMap.get(this.props.tool);
    this.tool.applyState(this.props.toolSettings);
  }

  componentDidMount() {
    this.ctx = this._canvas.getContext('2d');
    // this.ctx.fillStyle = '#F4A261';
    // this.boundRect = this._canvas.getBoundingClientRect();
  }

  componentDidUpdate() {
    this.tool = toolsMap.get(this.props.tool);
    this.tool.applyState(this.props.toolSettings);
  }

  normalizeEvent(ev) {
    this.boundRect = this._canvas.getBoundingClientRect();
    return [ev.clientX - this.boundRect.left, ev.clientY - this.boundRect.top]
  }

  onMouseDown(ev) {
    this.tool.onMouseDown(this.ctx, ...this.normalizeEvent(ev));
  }

  onMouseMove(ev) {
    this.tool.onMouseMove(this.ctx, ...this.normalizeEvent(ev));
  }

  onMouseUp(ev) {
    this.tool.onMouseUp(this.ctx, ...this.normalizeEvent(ev));
  }

  render() {
    return (
      <main className="surface">
        <section className="surface__drawer">
          <canvas
            ref={c => this._canvas = c}
            height="700"
            width="700"
            onMouseDown={this.onMouseDown.bind(this)}
            onMouseMove={this.onMouseMove.bind(this)}
            onMouseUp={this.onMouseUp.bind(this)}></canvas>
        </section>
      </main>
    )
  }
}

export default Surface;
