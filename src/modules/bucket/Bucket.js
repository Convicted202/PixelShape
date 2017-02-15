import AbstractTool from '../basetool/AbstractTool';
import floodFill from '../../utils/floodFill';
import { resizeImageData } from '../../utils/canvasUtils';

class Bucket extends AbstractTool {
  constructor (...args) {
    super(...args);
  }

  handleBufferBrushMove (x, y) {
    // "ghost" moving
    // on each move clear previous pixel and draw current
    this._buffer.save();
    this.useGhostStateOn(this._buffer);
    this.clearPixelCell(this._buffer, this.buf_x, this.buf_y);
    this.drawPixelCell(this._buffer, x, y);
    this._buffer.restore();
    [this.buf_x, this.buf_y] = [x, y];
  }

  onMouseDown (x, y) {
    this.mouseDown = true;
    this.draw(this._ctx, x, y);
  }

  onMouseMove (/* x, y */) {
    this.handleBufferBrushMove(...arguments);
    this.mouseDown = false;
  }

  onMouseUp (/* x, y */) {
    if (!this.mouseDown) return;
    this.mouseDown = false;
  }

  draw (ctx, x, y) {
    // fill surface context imageData
    floodFill(ctx, this.state.color, x, y);
    // and update naturalImageData for the active frame by resizing surface context to natural dimension
    this._naturalImageData = resizeImageData(
      ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height),
      this._naturalImageData.width,
      this._naturalImageData.height
    );
  }
}

export default Bucket;
