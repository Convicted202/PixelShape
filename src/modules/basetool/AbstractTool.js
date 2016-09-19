class AbstractTool {
  constructor() {
    // TODO: take default settings from defaults
    this.state = {
      size: 10,
      color: '#000000',
      alpha: 1,
      compositeOperation: 'source-over',
      tool: 'abstract',
      ghostData: {
        color: '#000000',
        alpha: 0.4
      }
    }
    this._ctx = null;
    this._buffer = null;
  }

  _assignBufferContext(ctx) {
    this._buffer = ctx;
    // prevent artifacts from previous tools to appear
    this._buffer.clearRect(0, 0, this._buffer.canvas.width, this._buffer.canvas.height);
    // this implies that new state was already set up
    this.useStateOn(this._buffer);
  }

  _assignRenderingContext(ctx) {
    this._ctx = ctx;
    // this implies that new state was already set up
    this.useStateOn(this._ctx);
  }

  applyState(state) {
    Object.assign(this.state, state);
  }

  useStateOn(ctx) {
    ctx.lineWidth = this.state.size;
    ctx.fillStyle = this.state.color;
    ctx.strokeStyle = this.state.color;
    ctx.globalAlpha = this.state.alpha;
    ctx.globalCompositeOperation = this.state.compositeOperation;
  }

  useGhostStateOn(ctx) {
    ctx.globalAlpha = this.state.ghostData.alpha;
    ctx.fillStyle = this.state.ghostData.color;
    ctx.strokeStyle = this.state.ghostData.color;
  }

  drawPixelCell(ctx, x, y) {
    if (!x || !y) return;
    const [roundX, roundY] = [Math.floor(x / this.state.size), Math.floor(y / this.state.size)];
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
