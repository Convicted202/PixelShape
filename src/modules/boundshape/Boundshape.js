import AbstractTool from '../basetool/AbstractTool';

/**
* Main class for creating bound-like shapes
* (shapes that can be limited with bounds)
* i.e. Rectangles, Ellipses, Circles, etc.
*/
class Boundshape extends AbstractTool {
  constructor (...args) {
    super(...args);
    this.clearCoords();
  }

  handleBufferBrushMove (x, y) {
    // "ghost" moving
    // on each move clear previous pixel and draw current
    this._buffer.save();
    this.useGhostStateOn(this._buffer);
    this.clearPixelCell(this._buffer, this.buf_x, this.buf_y);
    this.drawPixelCell(this._buffer, x, y);
    this._buffer.restore();
    [this.buf_x, this.buf_y] = [x, y];
  }

  clearCoords () {
    this.coords = {
      x0: null, y0: null,
      x1: null, y1: null
    };
  }

  onMouseDown (x, y) {
    this.mouseDown = true;
    this.coords.x0 = x;
    this.coords.y0 = y;
  }

  onMouseMove (x, y) {
    if (!this.mouseDown) {
      this.handleBufferBrushMove(x, y);
      return;
    }
    // TODO: implement cleaning of only needed part
    this._buffer.clearRect(0, 0, this._buffer.canvas.width, this._buffer.canvas.height);
    this.update(this._buffer, x, y);
  }

  onMouseUp (x, y) {
    this.mouseDown = false;
    this.update(this._ctx, x, y);
    // TODO: implement cleaning of only needed part
    this._buffer.clearRect(0, 0, this._buffer.canvas.width, this._buffer.canvas.height);
    this.clearCoords();
  }

  update (ctx, x, y) {
    this.coords.x1 = x;
    this.coords.y1 = y;
    this.draw(ctx, this.coords.x0, this.coords.y0, this.coords.x1, this.coords.y1);
  }
}

export default Boundshape;
