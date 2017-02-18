import AbstractTool from '../basetool/AbstractTool';
import { getContextColor, darkenLightenColor, colorsEqual } from '../../utils/colorUtils';

const lightenPersentage = 0.01;

// TODO: need to write tests for this and prior to that separate common functionality
// from this module and brush-likes to another module

class ColorAdjust extends AbstractTool {
  constructor (...args) {
    super(...args);
    [this.x, this.y] = [null, null];
    [this.buf_x, this.buf_y] = [null, null];
  }

  onMouseDown (x, y) {
    this.mouseDown = true;
    [this.x, this.y] = [x, y];
    this.draw(this._ctx, x, y);
  }

  onMouseMove (x, y) {
    this.handleGhostPixelMove(x, y);
    // actual drawing
    if (!this.mouseDown) return;
    this.draw(this._ctx, this.x, this.y);
    [this.x, this.y] = [x, y];
  }

  /* eslint-disable no-unused-vars */
  onMouseUp (x, y) {
    if (!this.mouseDown) return;
    this.mouseDown = false;
    [this.x, this.y] = [null, null];
  }

  // returns false if no color present on surface with coords [x, y]
  // otherwise returs shaded color
  getShadedColor (ctx, x, y, percentage) {
    const color = getContextColor(ctx, x, y);

    if (colorsEqual(this.state.transparent, color)) return false;

    return darkenLightenColor(color, percentage);
  }

  // saves current state and resets tool size to minimum
  saveState (ctx) {
    ctx.save();
    this.state.size = 1;
  }

  // restores previous state and actual tool size
  restoreState (ctx, size, color) {
    this.state.size = size;
    this.state.color = color;
    ctx.restore();
  }

  // walks through all pixels that are in bounds of current size and shades them
  adjustPixelGroup (ctx, x, y, stateSize, stateColor) {
    let i, j, partialX, partialY, halfSize, color;

    halfSize = stateSize / 2 | 0;

    this.saveState(ctx);
    for (i = 0; i < stateSize; i++) {
      for (j = 0; j < stateSize; j++) {
        partialX = x + (i - halfSize) * this.state.pixelSize;
        partialY = y + (j - halfSize) * this.state.pixelSize;
        color = this.getShadedColor(ctx, partialX, partialY, lightenPersentage);

        if (color) {
          ctx.fillStyle = color;
          this.state.color = color;
          this.drawPixelCell(ctx, partialX, partialY);
        }
      }
    }
    this.restoreState(ctx, stateSize, stateColor);
  }

  /* eslint-disable no-unused-vars */
  draw (ctx, x, y) {
    this.adjustPixelGroup(...arguments, this.state.size, this.state.color);
  }
}

export default ColorAdjust;
