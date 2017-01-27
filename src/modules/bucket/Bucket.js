import AbstractTool from '../basetool/AbstractTool';
import floodFill from 'utils/floodFill';
import { resizeImageData } from 'utils/canvasUtils';

class Bucket extends AbstractTool {
  constructor (...args) {
    super(...args);
  }

  onMouseDown (x, y) {
    this.filling = true;
    this.draw(this._ctx, x, y);
  }

  onMouseMove (/* x, y */) {
    this.filling = false;
  }

  onMouseUp (/* x, y */) {
    this.filling = false;
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
