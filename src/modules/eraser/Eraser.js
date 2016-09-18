import Brush from '../brush/Brush.js';
import lineTo from 'utils/lineTo';

class Eraser extends Brush {
  constructor(...args) {
    super(...args);
  }

  draw(ctx, x1, y1, x2, y2) {
    lineTo(this.clearPixelCell.bind(this), ...arguments);
  }
}

export default Eraser;
