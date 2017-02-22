import {clamp} from '../utils/mathUtils';

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

export const getContextColor = (context, x, y) => context.getImageData(x | 0, y | 0, 1, 1).data;

// http://stackoverflow.com/a/13542669
// darken - negative percent
// lighten - positive percent
export const darkenLightenColor = (RGB, percentage) => {
  const t = percentage < 0 ? 0 : 255,
        p = percentage < 0 ? -percentage : percentage,
        [R, G, B] = RGB;

  return `#${
    (
      0x1000000
      + (Math.round((t - R) * p) + R) * 0x10000
      + (Math.round((t - G) * p) + G) * 0x100
      + (Math.round((t - B) * p) + B)
    ).toString(16).slice(1)
  }`;
};

export const fillRectImageData = (imageData, x0, y0, width, height, color = [0, 0, 0, 0]) => {
  let i, j, x1 = x0 + width, y1 = y0 + height, pixel;

  x0 = clamp(x0, 0, imageData.width);
  y0 = clamp(y0, 0, imageData.height);
  x1 = clamp(x1, 0, imageData.width);
  y1 = clamp(y1, 0, imageData.height);

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

export const isLightColor = color => {
  const [R, G, B] = color;

  return (R * 0.299 + G * 0.587 + B * 0.114) > 186;
};

export const getBlackWhiteContrastColor = color => isLightColor(color) ? '#000000' : '#ffffff';

export const getImageDataActiveColors = (imageData, transparent = [0, 0, 0, 0]) => {
  const list = [];
  let i, j, index, color, hex,
      width = imageData.width,
      height = imageData.height;

  for (i = 0; i < width; i++) {
    for (j = 0; j < height; j++) {
      index = getPixelFromImageData(imageData, i, j);
      color = getColor(imageData, index);
      hex = rgbToHex(...color);

      if (colorsEqual(color, transparent) || list.includes(hex)) continue;
      list.push(hex);
    }
  }

  return list;
};

export const getAllActiveColors = (imageDataArr, transparent = [0, 0, 0, 0]) => {
  const list = imageDataArr.reduce((list, data) => (
    list.concat(getImageDataActiveColors(data, transparent))
  ), []);

  let result = [...new Set(list)];

  return result.sort((a, b) => {
    const _a = `0x${a.slice(1)}`,
          _b = `0x${b.slice(1)}`;

    return +_a - +_b;
  });
};

export const replaceColor = (imageData, baseColor, replacementColor) => {
  let i, j, index,
      width = imageData.width,
      height = imageData.height;

  for (i = 0; i < width; i++) {
    for (j = 0; j < height; j++) {
      index = getPixelFromImageData(imageData, i, j);

      if (equallyColored(imageData, index, baseColor)) putColor(imageData, index, replacementColor);
    }
  }
};
