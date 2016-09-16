import AbstractTool from '../basetool/AbstractTool';
import {ellipse} from 'utils/ellipseCircle';

class Ellipse extends AbstractTool {
  constructor(...args) {
    super(...args);
    this.x0 = null;
    this.y0 = null;
    this.x1 = null;
    this.y1 = null;
    this.cellSize = 10;
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
    this.drawCircumference(ctx, this.x0, this.y0, this.x1, this.y1);
  }

  drawCircumference(ctx, x0, y0, x1, y1) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ellipse(this.draw.bind(this), ...arguments);
  }

  draw(ctx, x, y) {
    const [roundX, roundY] = [Math.floor(x / this.cellSize), Math.floor(y / this.cellSize)];
    ctx.fillRect(roundX * this.cellSize, roundY * this.cellSize, this.cellSize, this.cellSize);
  }
}

export default Ellipse;
