import AbstractTool from '../basetool/AbstractTool';
import {
  replaceColor,
  stringToRGBA,
  getPixelFromImageData,
  getColor
} from '../../utils/colorUtils';

class ColorReplace extends AbstractTool {
  constructor (...args) {
    super(...args);
  }

  onMouseDown (x, y) {
    this.mouseDown = true;
    this.draw(this._ctx, x, y);
  }

  onMouseMove (x, y) {
    // size other than 1 should not be applicable to color replacement tool; so resetting to minimum
    this.state.size = 1;
    this.handleGhostPixelMove(x, y);
    this.mouseDown = false;
  }

  onMouseUp (/* x, y */) {
    if (!this.mouseDown) return;
    this.mouseDown = false;
  }

  draw (ctx, x, y) {
    // take image data to retrieve current color
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height),
          index = getPixelFromImageData(imageData, x | 0, y | 0),
          color = getColor(imageData, index);

    replaceColor(this._naturalImageData, color, stringToRGBA(this.state.color));
  }
}

export default ColorReplace;
