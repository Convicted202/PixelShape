import './surface.styl';

import React, { Component } from 'react';

class Surface extends Component {
  componentDidMount() {
    const ctx = this._canvas.getContext('2d');
    ctx.fillStyle = '#F4A261';
    ctx.fillRect(0,0, 100, 100);
  }

  render() {
    return (
      <main className="surface">
        <section className="surface__drawer">
          <canvas ref={(c) => this._canvas = c} height="700" width="700"></canvas>
        </section>
      </main>
    )
  }
}

export default Surface;
