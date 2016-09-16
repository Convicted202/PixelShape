import AbstractTool from '../basetool/AbstractTool';
import floodFill from 'utils/floodFill';

class Bucket extends AbstractTool {
  constructor(...args) {
    super(...args);
    this.fillColor = 0xefefef;
  }

  onMouseDown(ctx, x, y) {
    this.filling = true;
    this.draw(ctx, x, y);
  }

  onMouseMove(ctx, x, y) {
    // if (!this.filling) return;
    // this.draw(ctx, x, y);
    this.filling = false;
  }

  onMouseUp(ctx, x, y) {
    this.filling = false;
  }

  draw(ctx, x, y) {
    floodFill(ctx, this.fillColor, x, y);
  }
}

export default Bucket;
