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

/**
* https://en.wikipedia.org/wiki/Flood_fill
*/
export default (context, fillColor, x, y) => {
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
