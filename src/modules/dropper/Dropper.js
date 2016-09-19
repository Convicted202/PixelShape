import AbstractTool from '../basetool/AbstractTool';
import {
  getPixelFromImageData,
  rgbToHex,
  getColor
} from 'utils/colorUtils';

class Dropper extends AbstractTool {
  constructor(...args) {
    super(...args);
    [this.buf_x, this.buf_y] = [null, null];
  }

  handleBufferBrushMove(x, y) {
    // "ghost" moving
    // on each move clear previous pixel and draw current
    this._buffer.save();
    this.useGhostStateOn(this._buffer);
    this.clearPixelCell(this._buffer, this.buf_x, this.buf_y);
    this.drawPixelCell(this._buffer, x, y);
    this._buffer.restore();
    [this.buf_x, this.buf_y] = [x, y];
  }

  getUnderlyingColor(x, y) {
    const imageData = this._ctx.getImageData(0, 0, this._ctx.canvas.width, this._ctx.canvas.height),
          index = getPixelFromImageData(imageData, x, y),
          rgbaColor = getColor(imageData, index);

    return rgbToHex(...rgbaColor);
  }

  onMouseDown(x, y) {
    const hexColor = this.getUnderlyingColor(x, y);

    this.mouseDown = true;
    this.processColor(hexColor);
  }

  onMouseMove(x, y) {
    this.handleBufferBrushMove(x, y);
    // actual picking
    if (!this.mouseDown) return;

    const hexColor = this.getUnderlyingColor(x, y);
    this.processColor(hexColor);
  }

  onMouseUp(x, y) {
    const hexColor = this.getUnderlyingColor(x, y);
    this.mouseDown = false;
    this.processColor(hexColor);
  }

  processColor(color) {
    // TODO: this method should change actual state for colorpicker Component input values
    // console.log(color);
  }
}

export default Dropper;
