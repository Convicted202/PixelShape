import { fillRectImageData, stringToRGBA } from '../../utils/colorUtils';

const ACTION = {
  DRAW: 'fillRect',
  CLEAR: 'clearRect'
};

const getCellCount = (val, cellSize) => val / cellSize | 0;

class AbstractTool {
  constructor () {
    // TODO: take default settings from defaults
    this.state = {
      size: 1,
      pixelSize: 20,
      floatPixelSize: 20,
      color: '#000000',
      transparent: [0, 0, 0, 0],
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

  applyPixelSize (pixelSize) {
    this.state.floatPixelSize = pixelSize;
    this.state.pixelSize = pixelSize | 0;
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
    const pixelShift = this.state.size / 2 | 0,
          xCell = getCellCount(x, this.state.pixelSize) - pixelShift,
          yCell = getCellCount(y, this.state.pixelSize) - pixelShift;

    return {
      x: xCell * this.state.pixelSize,
      y: yCell * this.state.pixelSize,
      // these should be perfect mappings from surface coords to natural image data coords
      naturalX: getCellCount(x, this.state.floatPixelSize),
      naturalY: getCellCount(y, this.state.floatPixelSize)
    };
  }

  modifyPixelCell (ctx, x, y, action = ACTION.DRAW) {
    const coords = this.getPixeledCoords(x, y);
    let color;

    if (!coords) return;

    color = action === ACTION.DRAW ? stringToRGBA(this.state.color) : this.state.transparent;

    ctx[action](coords.x, coords.y, this.size, this.size);

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
