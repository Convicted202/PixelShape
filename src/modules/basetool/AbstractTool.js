class AbstractTool {
  constructor() {
    // TODO: take default settings from defaults
    this.state = {
      size: 10,
      color: '#000000',
      compositeOperation: 'source-over',
      tool: 'abstract'
    }
    this._ctx = null;
    this._buffer = null;
  }

  _assignBufferContext(ctx) {
    this._buffer = ctx;
    // prevent artifacts from previous tools to appear
    this._buffer.clearRect(0, 0, this._buffer.canvas.width, this._buffer.canvas.height);
  }

  _assignRenderingContext(ctx) {
    this._ctx = ctx;
  }

  applyState(state) {
    Object.assign(this.state, state);
  }

  useStateOn(ctx) {
    ctx.lineWidth = this.state.size;
    ctx.fillStyle = this.state.color
    ctx.globalCompositeOperation = this.state.compositeOperation;
  }

  drawPixelCell(ctx, x, y) {
    if (!x || !y) return;
    const [roundX, roundY] = [Math.floor(x / this.state.size), Math.floor(y / this.state.size)];
    this.useStateOn(ctx);
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
    this.useStateOn(ctx);
    ctx.clearRect(
      roundX * this.state.size,
      roundY * this.state.size,
      this.state.size,
      this.state.size
    );
  }

  draw(ctx, x0, y0, x1, y1) {
    this.useStateOn(ctx);
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
