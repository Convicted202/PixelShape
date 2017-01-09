import {
  RGBA,
  stringToHex,
  hexToRGBA,
  getPixelFromImageData,
  putColor,
  equallyColored,
  colorsEqual
} from './colorUtils';

const WEST = 'WEST',
      EAST = 'EAST',
      NORTH = 'NORTH',
      SOUTH = 'SOUTH';

const getPixelPosition = (imageData, direction, pixelIndex) => {
  const directionShifts = {
    WEST :  1,
    EAST :  -1,
    NORTH:  -imageData.width,
    SOUTH:  imageData.width
  };

  return pixelIndex + directionShifts[direction] * RGBA;
};

// TODO: this functionality should be called only when pixel is not mapped yet
const mapColorToNaturalImageData = (imgData, originalIndex, originalImgData, color, pixelSize) => {
  const RGBAIndex = originalIndex / 4,
        x = (RGBAIndex % originalImgData.width) / pixelSize,
        y = (RGBAIndex / originalImgData.width) / pixelSize;

  let naturalPixelIndex;

  naturalPixelIndex = getPixelFromImageData(imgData, x | 0, y | 0);
  putColor(imgData, naturalPixelIndex, color);
};

/**
* https://en.wikipedia.org/wiki/Flood_fill
*/
export default (context, naturalImageData, fillColor, x, y, pixelSize) => {
  const queue = [],
        baseCanvas = context.canvas,
        imageData = context.getImageData(0, 0, baseCanvas.width, baseCanvas.height),
        rgbaColor = hexToRGBA(stringToHex(fillColor));

  [x, y] = [Math.round(x), Math.round(y)];

  let pixelIndex = getPixelFromImageData(imageData, x, y);

  const initialColor = imageData.data.slice(pixelIndex, pixelIndex + RGBA);

  if (colorsEqual(rgbaColor, initialColor)) return;

  queue.push(pixelIndex);

  while (queue.length) {
    pixelIndex = queue.pop();

    if (equallyColored(imageData, pixelIndex, initialColor)) {
      putColor(imageData, pixelIndex, rgbaColor);

      // map surface imagedata to natural frame imagedata
      mapColorToNaturalImageData(naturalImageData, pixelIndex, imageData, rgbaColor, pixelSize);

      queue.push(
        getPixelPosition(imageData, WEST, pixelIndex),
        getPixelPosition(imageData, EAST, pixelIndex),
        getPixelPosition(imageData, NORTH, pixelIndex),
        getPixelPosition(imageData, SOUTH, pixelIndex)
      );
    }
  }

  context.putImageData(imageData, 0, 0);
};
