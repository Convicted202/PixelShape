import AbstractTool from '../basetool/AbstractTool';
import {
  replaceColor,
  stringToRGBA,
  getPixelFromImageData,
  getColor
} from '../../utils/colorUtils';
import { resizeImageData } from '../../utils/canvasUtils';

class ColorReplace extends AbstractTool {
  constructor (...args) {
    super(...args);
  }

  onMouseDown (x, y) {
    this.mouseDown = true;
    this.draw(this._ctx, x, y);
  }

  onMouseMove (x, y) {
    this.handleGhostPixelMove(x, y);
    this.mouseDown = false;
  }

  onMouseUp (/* x, y */) {
    if (!this.mouseDown) return;
    this.mouseDown = false;
  }

  draw (ctx, x, y) {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height),
          index = getPixelFromImageData(imageData, x | 0, y | 0),
          color = getColor(imageData, index);

    replaceColor(imageData, color, stringToRGBA(this.state.color));
    ctx.putImageData(imageData, 0, 0);

    this._naturalImageData = resizeImageData(
      imageData,
      this._naturalImageData.width,
      this._naturalImageData.height
    );
  }
}

export default ColorReplace;
