import AbstractTool from '../basetool/AbstractTool';
import lineTo from 'utils/lineTo';

class Brush extends AbstractTool {
  constructor (...args) {
    super(...args);
    [this.x, this.y] = [null, null];
    [this.buf_x, this.buf_y] = [null, null];
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

  onMouseDown (x, y) {
    this.mouseDown = true;
    [this.x, this.y] = [x, y];
    this.drawPixelCell(this._ctx, x, y);
  }

  onMouseMove (x, y) {
    // actual drawing
    if (!this.mouseDown) {
      this.handleBufferBrushMove(x, y);
      return;
    }
    this.draw(this._ctx, this.x, this.y, x, y);
    [this.x, this.y] = [x, y];
  }

  onMouseUp (x, y) {
    if (!this.mouseDown) return;
    this.mouseDown = false;
    this.draw(this._ctx, x, y, this.x, this.y);
    [this.x, this.y] = [null, null];
  }

  draw (/* ctx, x1, y1, x2, y2 */) {
    lineTo(this.drawPixelCell.bind(this), ...arguments);
  }
}

export default Brush;
