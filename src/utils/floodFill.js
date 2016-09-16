const WEST = 'WEST',
      EAST = 'EAST',
      NORTH = 'NORTH',
      SOUTH = 'SOUTH';

const RGBA = 4;

const hexToRGBA = hex => {
    const [r, g, b] = [
      hex >> 16,
      hex >> 8 & 0xFF,
      hex & 0xFF
    ];

    return [r, g, b, 255];
}

const getPixelFromImageData = (imageData, x, y) => (y * imageData.width + x) * RGBA;

const putColor = (imageData, pixelIndex, color) => {
  let i = 0;
  for (; i < RGBA; i++) {
    imageData.data[pixelIndex + i] = color[i];
  }
}

const equallyColored = (imageData, pixelIndex, color) => {
  let [diff, i] = [0, 0];

  if (pixelIndex < 0 ||
      pixelIndex + RGBA - 1 > imageData.data.length) {
      return false;
  }

  for (; i < RGBA; i++) {
      diff += Math.abs(imageData.data[pixelIndex + i] - color[i]);
  }
  return !diff;
}

const colorsEqual = (color0, color1) => {
  let i = 0, diff = 0;
  for (; i < RGBA; i++) {
    diff += Math.abs(color0[i] - color1[i]);
  }
  return diff < Number.EPSILON;
}

const getPixelPosition = (imageData, direction, pixelIndex) => {
  const directionShifts = {
    WEST :  1,
    EAST :  -1,
    NORTH:  -imageData.width,
    SOUTH:  imageData.width
  }

  return pixelIndex + directionShifts[direction] * RGBA;
}

/**
* https://en.wikipedia.org/wiki/Flood_fill
*/
export default (context, fillColor, x, y) => {
  const queue = [],
        baseCanvas = context.canvas,
        imageData = context.getImageData(0, 0, baseCanvas.width, baseCanvas.height),
        rgbaColor = hexToRGBA(fillColor);

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
}
