import Brush from '../brush/Brush.js';
import lineTo from 'utils/lineTo';

class Eraser extends Brush {
  constructor (...args) {
    super(...args);
  }

  onMouseDown (x, y) {
    this.mouseDown = true;
    [this.x, this.y] = [x, y];
    this.clearPixelCell(this._ctx, x, y);
  }

  draw (/* ctx, x1, y1, x2, y2 */) {
    lineTo(this.clearPixelCell.bind(this), ...arguments);
  }
}

export default Eraser;
