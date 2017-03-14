import AbstractTool from '../basetool/AbstractTool';
import lineTo from '../../utils/lineTo';

class Brush extends AbstractTool {
  constructor (...args) {
    super(...args);
    [this.x, this.y] = [null, null];
    [this.buf_x, this.buf_y] = [null, null];
  }

  onMouseDown (x, y) {
    this.mouseDown = true;
    [this.x, this.y] = [x, y];
    this.drawPixelCell(this._ctx, x, y);
  }

  onMouseMove (x, y) {
    // actual drawing
    if (!this.mouseDown) {
      this.handleGhostPixelMove(x, y);
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
