import AbstractTool from '../basetool/AbstractTool';
import {ellipse} from 'utils/ellipseCircle';

class Ellipse extends AbstractTool {
  constructor(...args) {
    super(...args);
    this.x0 = null;
    this.y0 = null;
    this.x1 = null;
    this.y1 = null;
  }

  onMouseDown(ctx, x, y) {
    this.drawing = true;
    this.x0 = x;
    this.y0 = y;
  }

  onMouseMove(ctx, x, y) {
    if (!this.drawing) return;
    this.update(ctx, x, y);
  }

  onMouseUp(ctx, x, y) {
    this.drawing = false;
    this.update(ctx, x, y);
    this.x0 = null;
    this.y0 = null;
    this.x1 = null;
    this.y1 = null;
  }

  update(ctx, x, y) {
    this.x1 = x;
    this.y1 = y;
    this.draw(ctx, this.x0, this.y0, this.x1, this.y1);
  }

  draw(ctx, x0, y0, x1, y1) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ellipse(this.drawPixelCell.bind(this), ...arguments);
  }
}

export default Ellipse;
