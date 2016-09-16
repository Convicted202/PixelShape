import AbstractTool from '../basetool/AbstractTool';
import lineTo from 'utils/lineTo';

class Brush extends AbstractTool {
  constructor(...args) {
    super(...args);
    this.x = null;
    this.y = null;
    this.cellSize = 10;
  }

  onMouseDown(ctx, x, y) {
    this.mouseDown = true;
    [this.x, this.y] = [x, y];
    this.draw(ctx, x, y);
  }

  onMouseMove(ctx, x, y) {
    if (!this.mouseDown) return;
    this.line(ctx, this.x, this.y, x, y);
    [this.x, this.y] = [x, y];
  }

  onMouseUp(ctx, x, y) {
    this.mouseDown = false;
    this.line(ctx, x, y, this.x, this.y);
    [this.x, this.y] = [null, null];
  }

  line (ctx, x1, y1, x2, y2) {
    lineTo(this.draw.bind(this), ...arguments);
  }

  // makes it look crispy/pixelated
  draw(ctx, x, y) {
    const [roundX, roundY] = [Math.floor(x / this.cellSize), Math.floor(y / this.cellSize)];
    ctx.fillRect(roundX * this.cellSize, roundY * this.cellSize, this.cellSize, this.cellSize);
  }
}

export default Brush;
