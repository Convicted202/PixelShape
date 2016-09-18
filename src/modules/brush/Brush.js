import AbstractTool from '../basetool/AbstractTool';
import lineTo from 'utils/lineTo';

class Brush extends AbstractTool {
  constructor(...args) {
    super(...args);
    this.x = null;
    this.y = null;
  }

  onMouseDown(ctx, x, y) {
    this.mouseDown = true;
    [this.x, this.y] = [x, y];
    this.drawPixelCell(ctx, x, y);
  }

  onMouseMove(ctx, x, y) {
    if (!this.mouseDown) return;
    this.draw(ctx, this.x, this.y, x, y);
    [this.x, this.y] = [x, y];
  }

  onMouseUp(ctx, x, y) {
    this.mouseDown = false;
    this.draw(ctx, x, y, this.x, this.y);
    [this.x, this.y] = [null, null];
  }

  draw(ctx, x1, y1, x2, y2) {
    lineTo(this.drawPixelCell.bind(this), ...arguments);
  }
}

export default Brush;
