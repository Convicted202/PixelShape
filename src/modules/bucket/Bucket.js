import AbstractTool from '../basetool/AbstractTool';
import floodFill from 'utils/floodFill';

class Bucket extends AbstractTool {
  constructor(...args) {
    super(...args);
  }

  onMouseDown(ctx, x, y) {
    this.filling = true;
    this.draw(ctx, x, y);
  }

  onMouseMove(ctx, x, y) {
    this.filling = false;
  }

  onMouseUp(ctx, x, y) {
    this.filling = false;
  }

  draw(ctx, x, y) {
    floodFill(ctx, this.state.color, x, y);
  }
}

export default Bucket;
