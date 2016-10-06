import AbstractTool from '../basetool/AbstractTool';
import floodFill from 'utils/floodFill';

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
    floodFill(ctx, this.state.color, x, y);
  }
}

export default Bucket;
