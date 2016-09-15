class AbstractTool {
  constructor() {
    // base tool constructor
  }

  _assignWithRenderingContext(ctx) {
    this._ctx = ctx;
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
