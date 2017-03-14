import AbstractTool from '../basetool/AbstractTool';
import {
  getPixelFromImageData,
  rgbToHex,
  getColor
} from '../../utils/colorUtils';

class Dropper extends AbstractTool {
  constructor (...args) {
    super(...args);
    [this.buf_x, this.buf_y] = [null, null];
  }

  getUnderlyingColor (x, y) {
    const rounds = this.getPixeledCoords(x, y),
          imageData = this._ctx.getImageData(0, 0, this._ctx.canvas.width, this._ctx.canvas.height),
          index = getPixelFromImageData(imageData, rounds.x, rounds.y),
          rgbaColor = getColor(imageData, index);

    return rgbToHex(...rgbaColor);
  }

  onMouseDown (x, y) {
    const hexColor = this.getUnderlyingColor(x, y);

    this.mouseDown = true;
    this.processColor(hexColor);
  }

  onMouseMove (x, y) {
    this.handleGhostPixelMove(x, y);
    // actual picking
    if (!this.mouseDown) return;

    const hexColor = this.getUnderlyingColor(x, y);
    this.processColor(hexColor);
  }

  onMouseUp (x, y) {
    const hexColor = this.getUnderlyingColor(x, y);
    if (!this.mouseDown) return;
    this.mouseDown = false;
    this.processColor(hexColor);
  }

  processColor (color) {
    this.storeCallback(color);
  }
}

export default Dropper;
