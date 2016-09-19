import AbstractTool from '../basetool/AbstractTool';
import {ellipse} from 'utils/ellipseCircle';

class Ellipse extends AbstractTool {
  constructor(...args) {
    super(...args);
    this.clearCoords();
  }

  clearCoords() {
    this.coords = {
      x0: null, y0: null,
      x1: null, y1: null
    };
  }

  onMouseDown(x, y) {
    this.drawing = true;
    this.coords.x0 = x;
    this.coords.y0 = y;
  }

  onMouseMove(x, y) {
    if (!this.drawing) return;
    this._buffer.clearRect(0, 0, this._buffer.canvas.width, this._buffer.canvas.height);
    this.update(this._buffer, x, y);
  }

  onMouseUp(x, y) {
    this.drawing = false;
    this.update(this._ctx, x, y);
    this._buffer.clearRect(0, 0, this._buffer.canvas.width, this._buffer.canvas.height);
    this.clearCoords();
  }

  update(ctx, x, y) {
    this.coords.x1 = x;
    this.coords.y1 = y;
    this.draw(ctx, this.coords.x0, this.coords.y0, this.coords.x1, this.coords.y1);
  }

  draw(ctx, x0, y0, x1, y1) {
    ellipse(this.drawPixelCell.bind(this), ...arguments);
  }
}

export default Ellipse;
