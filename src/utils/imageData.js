import { getPixelFromImageData, putColor, getColor } from './colorUtils';

export default class ImageDataExtended {
  constructor () {
    let args = [...arguments], initial;

    if (arguments.length < 2) {
      throw new TypeError(`
        Failed to construct 'ImageDataExtended': 2 arguments required, but only ${arguments.length} present.
      `);
    }

    if (args.length > 2) initial = args.shift();

    if (initial && !(initial instanceof Uint8ClampedArray)) {
      throw new TypeError(`
        Failed to construct 'ImageDataExtended': parameter 1 is not of type 'Uint8ClampedArray'
      `);
    }

    if (initial && initial.length !== 4 * args[0] * args[1]) {
      throw new Error(`
        Failed to construct 'ImageData': The input data byte length is not a multiple of (4 * width * height)
      `);
    }

    this.width = args[0];
    this.height = args[1];
    this.data = initial || new Uint8ClampedArray(4 * this.width * this.height);
  }

  getImageData (sx, sy, sw, sh) {
    let iData = new ImageData(sw, sh),
        i, j, index, color;

    for (i = 0; i < sw; i++) {
      for (j = 0; j < sh; j++) {
        index = getPixelFromImageData(this, sx + i, sy + j);
        color = getColor(this, index);
        index = getPixelFromImageData(iData, i, j);
        putColor(iData, index, color);
      }
    }

    return iData;
  }

  putImageData (imagedata, dx, dy) {
    let index, color, i, j,
        width = imagedata.width, height = imagedata.height;

    if (dx > this.width || dy > this.height) return this;

    for (i = 0; i < width; i++) {
      for (j = 0; j < height; j++) {
        index = getPixelFromImageData(imagedata, i, j);
        color = getColor(imagedata, index);
        index = getPixelFromImageData(this, i + dx, j + dy);
        putColor(this, index, color);
      }
    }

    return this;
  }

  // the only thing so far needed
  // clears entire imagedata object
  clearRect () {
    this.data.fill(0);
  }
}
