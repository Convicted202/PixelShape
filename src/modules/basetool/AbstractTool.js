class AbstractTool {
  constructor() {
    // TODO: take default settings from defaults
    this.state = {
      stroke: 10,
      color: '#000000',
      tool: 'abstract'
    }
  }

  _assignWithRenderingContext(ctx) {
    this._ctx = ctx;
  }

  applyState(state) {
    Object.assign(this.state, state);
  }

  drawPixelCell(ctx, x, y) {
    const [roundX, roundY] = [Math.floor(x / this.state.stroke), Math.floor(y / this.state.stroke)];
    ctx.lineWidth = this.state.stroke;
    ctx.fillStyle = this.state.color;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillRect(
      roundX * this.state.stroke,
      roundY * this.state.stroke,
      this.state.stroke,
      this.state.stroke
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
