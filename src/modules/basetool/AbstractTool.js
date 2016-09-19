class AbstractTool {
  constructor() {
    // TODO: take default settings from defaults
    this.state = {
      size: 10,
      color: '#000000',
      tool: 'abstract'
    }
    this._ctx = null;
    this._buffer = null;
  }

  _assignBufferContext(ctx) {
    this._buffer = ctx;
  }

  _assignRenderingContext(ctx) {
    this._ctx = ctx;
  }

  applyState(state) {
    Object.assign(this.state, state);
  }

  drawPixelCell(ctx, x, y) {
    if (!x || !y) return;
    const [roundX, roundY] = [Math.floor(x / this.state.size), Math.floor(y / this.state.size)];
    ctx.lineWidth = this.state.size;
    ctx.fillStyle = this.state.color;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillRect(
      roundX * this.state.size,
      roundY * this.state.size,
      this.state.size,
      this.state.size
    );
  }

  clearPixelCell(ctx, x, y) {
    if (!x || !y) return;
    const [roundX, roundY] = [Math.floor(x / this.state.size), Math.floor(y / this.state.size)];
    ctx.lineWidth = this.state.size;
    ctx.clearRect(
      roundX * this.state.size,
      roundY * this.state.size,
      this.state.size,
      this.state.size
    );
  }

  draw() {
    throw Error('Tool draw event not implemented');
  }

  onMouseDown() {
    throw Error('Tool mouseDown event not implemented');
  }

  onMouseMove() {
    throw Error('Tool mouseMove event not implemented');
  }

  onMouseUp() {
    throw Error('Tool mouseUp event not implemented');
  }
}

export default AbstractTool;
