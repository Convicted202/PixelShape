import AbstractTool from '../basetool/AbstractTool';
import lineTo from '../../utils/lineTo';

class MirrorBrush extends AbstractTool {
  constructor (...args) {
    super(...args);
    this.shift = {
      x: false,
      y: true
    };
  }

  getMirrorGhost (ctx, x, y) {
    const width = ctx.canvas.width,
          height = ctx.canvas.height;

    return {
      x: this.shift.x ? width - x : x,
      y: this.shift.y ? height - y : y
    };
  }

  mirroredPixelDraw (ctx, x, y) {
    const mirrored = this.getMirrorGhost(ctx, x, y);

    this.drawPixelCell(this._ctx, x, y);
    this.drawPixelCell(this._ctx, mirrored.x, mirrored.y);
  }

  mirroredDraw (ctx, x1, y1, x2, y2) {
    const m1 = this.getMirrorGhost(ctx, x1, y1),
          m2 = this.getMirrorGhost(ctx, x2, y2);

    this.draw(this._ctx, x1, y1, x2, y2);
    this.draw(this._ctx, m1.x, m1.y, m2.x, m2.y);
  }

  handleGhostPixelMove (x, y) {
    // "ghost" moving
    // on each move clear previous pixel and draw current
    if (!this._buffer) return;
    const mirroredOld = this.getMirrorGhost(this._buffer, this.buf_x, this.buf_y),
          mirroredNew = this.getMirrorGhost(this._buffer, x, y);

    this._buffer.save();
    this.useGhostStateOn(this._buffer);
    this.clearPixelCell(this._buffer, this.buf_x, this.buf_y);
    this.clearPixelCell(this._buffer, mirroredOld.x, mirroredOld.y);
    this.drawPixelCell(this._buffer, x, y);
    this.drawPixelCell(this._buffer, mirroredNew.x, mirroredNew.y);
    this._buffer.restore();
    [this.buf_x, this.buf_y] = [x, y];
  }

  onMouseDown (x, y) {
    this.mouseDown = true;
    [this.x, this.y] = [x, y];
    this.mirroredPixelDraw(this._ctx, x, y);
  }

  onMouseMove (x, y) {
    // actual drawing
    if (!this.mouseDown) {
      this.handleGhostPixelMove(x, y);
      return;
    }
    this.mirroredDraw(this._ctx, this.x, this.y, x, y);
    [this.x, this.y] = [x, y];
  }

  onMouseUp (x, y) {
    if (!this.mouseDown) return;
    this.mouseDown = false;
    this.mirroredDraw(this._ctx, x, y, this.x, this.y);
    [this.x, this.y] = [null, null];
  }

  draw (/* ctx, x1, y1, x2, y2 */) {
    lineTo(this.drawPixelCell.bind(this), ...arguments);
  }
}

export default MirrorBrush;
