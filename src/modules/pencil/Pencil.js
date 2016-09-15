import AbstractTool from '../basetool/AbstractTool';

class Pencil extends AbstractTool {
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

  /**
  * Bresenham's line algorithm
  */
  line (ctx, x1, y1, x2, y2) {
    let x, y, error = 0;
    const steep = (Math.abs(y2 - y1) > Math.abs(x2 - x1));
    if (steep){
      [x1, y1] = [y1, x1];
      [x2, y2] = [y2, x2];
    }
    if (x1 > x2) {
      [x1, x2] = [x2, x1];
      [y1, y2] = [y2, y1];
    }

    y = y1;

    const [dx, dy] = [x2 - x1, Math.abs(y2 - y1)],
          de = dy / dx,
          yStep = y1 < y2 ? 1 : -1;

    for (x = x1; x < x2; x++) {
      if (steep) {
        this.draw(ctx, y, x);
      } else {
        this.draw(ctx, x, y);
      }

      error += de;
      if (error >= 0.5) {
        y += yStep;
        error -= 1.0;
      }
    }
  }

  // makes it look crispy/pixelated
  draw(ctx, x, y) {
    const [roundX, roundY] = [Math.floor(x / this.cellSize), Math.floor(y / this.cellSize)];
    ctx.fillRect(roundX * this.cellSize, roundY * this.cellSize, this.cellSize, this.cellSize);
  }
}

export default Pencil;
