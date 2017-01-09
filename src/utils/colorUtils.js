export const RGBA = 4;

export const stringToHex = str => {
  const num = str.match(/\w+/);
  return parseInt(num, 16);
};

export const rgbToHex = (r, g, b) => {
  const hexVal = ((1 << 24) + (r << 16) + (g << 8) + b);
  return `#${hexVal.toString(16).slice(1)}`;
};

export const hexToRGBA = hex => {
  const [r, g, b] = [
    hex >> 16,
    hex >> 8 & 0xFF,
    hex & 0xFF
  ];

  return [r, g, b, 255];
};

export const stringToRGBA = str => hexToRGBA(stringToHex(str));

export const getPixelFromImageData = (imageData, x, y) => (y * imageData.width + x) * RGBA;

export const putColor = (imageData, pixelIndex, color) => {
  let i = 0;
  for (; i < RGBA; i++)
    imageData.data[pixelIndex + i] = color[i];
};

export const getColor = (imageData, pixelIndex) => {
  let i = 0;
  const color = [];

  for (; i < RGBA; i++)
    color.push(imageData.data[pixelIndex + i]);

  return color;
};

export const fillRectImageData = (imageData, x0, y0, width, height, color = [0, 0, 0, 0]) => {
  let i, j, x1 = x0 + width, y1 = y0 + height, pixel;

  for (i = x0; i < x1; i++) {
    for (j = y0; j < y1; j++) {
      pixel = getPixelFromImageData(imageData, i, j);
      putColor(imageData, pixel, color);
    }
  }
};

export const equallyColored = (imageData, pixelIndex, color) => {
  let [diff, i] = [0, 0];

  if (pixelIndex < 0 || pixelIndex + RGBA - 1 > imageData.data.length) return false;

  for (; i < RGBA; i++)
    diff += Math.abs(imageData.data[pixelIndex + i] - color[i]);

  return !diff;
};

export const colorsEqual = (color0, color1) => {
  let i = 0, diff = 0;
  for (; i < RGBA; i++)
    diff += Math.abs(color0[i] - color1[i]);

  return diff < Number.EPSILON;
};
