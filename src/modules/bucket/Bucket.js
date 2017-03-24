import AbstractTool from '../basetool/AbstractTool';
import floodFill from '../../utils/floodFill';

class Bucket extends AbstractTool {
  constructor (...args) {
    super(...args);
  }

  onMouseDown (x, y) {
    this.mouseDown = true;
    this.draw(this._ctx, x, y);
  }

  onMouseMove (x, y) {
    // size other than 1 should not be applicable to bucket tool; so resetting to minimum
    this.state.size = 1;
    this.handleGhostPixelMove(x, y);
    this.mouseDown = false;
  }

  onMouseUp (/* x, y */) {
    if (!this.mouseDown) return;
    this.mouseDown = false;
  }

  draw (ctx, x, y) {
    const coords = this.getPixeledCoords(x, y);
    // no need to worry about drawing on the real context, since Surface will react to changes
    // made to this._naturalImageData when time
    floodFill(this._naturalImageData, this.state.color, coords.naturalX, coords.naturalY);
  }
}

export default Bucket;
