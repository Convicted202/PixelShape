import { fillRectImageData, stringToRGBA } from 'utils/colorUtils';

const ACTION = {
  DRAW: 'fillRect',
  CLEAR: 'clearRect'
};

class AbstractTool {
  constructor () {
    // TODO: take default settings from defaults
    this.state = {
      size: 1,
      pixelSize: 20,
      color: '#000000',
      transparent: '#000000',
      alpha: 1,
      compositeOperation: 'source-over',
      tool: 'abstract',
      ghostData: {
        color: '#000000',
        alpha: 0.4
      }
    };
    this._ctx = null;
    this._buffer = null;
    this._naturalImageData = null;
  }

  _assignBufferContext (ctx) {
    this._buffer = ctx;
    // prevent artifacts from previous tools to appear
    this._buffer.clearRect(0, 0, this._buffer.canvas.width, this._buffer.canvas.height);
    // this implies that new state was already set up
    this.useStateOn(this._buffer);
  }

  _assignRenderingContext (ctx) {
    this._ctx = ctx;
    // this implies that new state was already set up
    this.useStateOn(this._ctx);
  }

  _applyNaturalImageData (imageData) {
    this._naturalImageData = imageData;
  }

  get size () {
    return this.state.size * this.state.pixelSize;
  }

  applyState (state) {
    Object.assign(this.state, state);
  }

  useStateOn (ctx) {
    ctx.lineWidth = this.size;
    ctx.fillStyle = this.state.color;
    ctx.strokeStyle = this.state.color;
    ctx.globalAlpha = this.state.alpha;
    ctx.globalCompositeOperation = this.state.compositeOperation;
  }

  useGhostStateOn (ctx) {
    ctx.globalAlpha = this.state.ghostData.alpha;
    ctx.fillStyle = this.state.ghostData.color;
    ctx.strokeStyle = this.state.ghostData.color;
  }

  getPixeledCoords (x, y) {
    if (typeof x === 'undefined' || typeof y === 'undefined') return false;
    // shift x and y half a brush size and get how much grid pixels are in it
    const timesX = x / this.state.pixelSize | 0,
          timesY = y / this.state.pixelSize | 0,
          pixelShift = this.state.size / 2 | 0,
          roundedVals = {
            x: timesX - pixelShift,
            y: timesY - pixelShift
          };
    // const timesX = Math.floor((x) / this.state.pixelSize),
    //       timesY = Math.floor((y) / this.state.pixelSize);

    return {
      x: roundedVals.x * this.state.pixelSize,
      y: roundedVals.y * this.state.pixelSize,
      naturalX: roundedVals.x,
      naturalY: roundedVals.y
    };
  }

  modifyPixelCell (ctx, x, y, action = ACTION.DRAW) {
    const coords = this.getPixeledCoords(x, y);
    let color;

    if (!coords) return;

    color = action === ACTION.DRAW ? this.state.color : this.state.transparent;

    ctx[action](coords.x, coords.y, this.size, this.size);
    color = stringToRGBA(color);

    if (ctx === this._ctx) {
      fillRectImageData(
        this._naturalImageData,
        coords.naturalX,
        coords.naturalY,
        +this.state.size,
        +this.state.size,
        color
      );
    }
  }

  drawPixelCell (ctx, x, y) {
    this.modifyPixelCell(ctx, x, y, ACTION.DRAW);
  }

  clearPixelCell (ctx, x, y) {
    this.modifyPixelCell(ctx, x, y, ACTION.CLEAR);
  }

  /* eslint-disable no-unused-vars */
  draw (ctx, x0, y0, x1, y1) {
    this.useStateOn(ctx);
  }

  storeCallback () {
    throw Error('Store callback was not provided');
  }

  onMouseDown () {
    throw Error('Tool mouseDown event not implemented');
  }

  onMouseMove () {
    throw Error('Tool mouseMove event not implemented');
  }

  onMouseUp () {
    throw Error('Tool mouseUp event not implemented');
  }

  cancelMouseDown () {
    this.mouseDown = false;
  }
}

export default AbstractTool;
