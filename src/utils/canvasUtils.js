import { getPixelFromImageData, getColor, putColor } from './colorUtils';
import { ANCHORS } from '../defaults/defaults';

// TODO: write tests for all of these

export const enableImageSmoothing = context => {
  context.imageSmoothingEnabled = true;
  context.mozImageSmoothingEnabled = true;
  context.webkitImageSmoothingEnabled = true;
  context.msImageSmoothingEnabled = true;
};

export const disableImageSmoothing = context => {
  context.imageSmoothingEnabled = false;
  context.mozImageSmoothingEnabled = false;
  context.webkitImageSmoothingEnabled = false;
  context.msImageSmoothingEnabled = false;
};

export const drawGrid = (context, space, gutter) => {
  let i = 0;
  const width = context.canvas.width,
        height = context.canvas.height;

  context.clearRect(0, 0, width, height);

  context.beginPath();
  while (i < width) {
    context.moveTo(i, 0);
    context.lineTo(i, height);
    i += space;
  }

  i = 0;
  while (i < height) {
    context.moveTo(0, i);
    context.lineTo(width, i);
    i += space;
  }

  context.lineWidth = gutter;
  context.strokeStyle = '#000';
  context.stroke();
};

const createCanvas = (width, height) => {
  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;
  return canvas;
};

// resizes/stretches imageData to new width and height
export const resizeImageData = (imageData, targetWidth, targetHeight) => {
  const originalCanvas = createCanvas(imageData.width, imageData.height),
        originalContext = originalCanvas.getContext('2d'),
        targetCanvas = createCanvas(targetWidth, targetHeight),
        targetContext = targetCanvas.getContext('2d');

  disableImageSmoothing(originalContext);
  disableImageSmoothing(targetContext);
  originalContext.putImageData(imageData, 0, 0);

  targetContext.drawImage(
    originalCanvas,
    0, 0, imageData.width, imageData.height,
    0, 0, targetWidth, targetHeight
  );

  return targetContext.getImageData(0, 0, targetWidth, targetHeight);
};

// extends imageData to new width and height based on anchor point
export const extendImageData = (imageData, width, height, anchor) => {
  const target = new ImageData(width, height),
        oldWidth = imageData.width,
        oldHeight = imageData.height,
        offset = ANCHORS[anchor],
        halfWidth = (width - oldWidth) / 2 | 0,
        halfHeight = (height - oldHeight) / 2 | 0,
        shiftW = Math.abs(halfWidth),
        shiftH = Math.abs(halfHeight);

  let x, y, cols, rows, shiftedX, shiftedY, tx, ty,
      pxl, tpxl, color;

  cols = halfWidth > 0 ? oldWidth : width;
  rows = halfHeight > 0 ? oldHeight : height;

  for (x = 0; x < cols; x++) {
    for (y = 0; y < rows; y++) {
      shiftedX = shiftW * offset[1] + x;
      shiftedY = shiftH * offset[0] + y;
      tx = halfWidth > 0 ? x : shiftedX;
      ty = halfHeight > 0 ? y : shiftedY;

      pxl = getPixelFromImageData(imageData, tx, ty);
      color = getColor(imageData, pxl);

      tx = halfWidth > 0 ? shiftedX : x;
      ty = halfHeight > 0 ? shiftedY : y;

      tpxl = getPixelFromImageData(target, tx, ty);
      putColor(target, tpxl, color);
    }
  }

  return target;
};

// extends or stretches image depending on params passed
export const expandImageData = (imageData, width, height, anchor = 'oo', stretch) =>
  stretch
    ? resizeImageData(imageData, width, height)
    : extendImageData(imageData, width, height, anchor);

export const combineImageDataToCanvas = (imageDataArr, imageDataWidth, imageDataHeight) => {
  let tmpCanvas = createCanvas(imageDataWidth, imageDataHeight),
      tmpContext = tmpCanvas.getContext('2d'),
      resultCanvas = createCanvas(imageDataArr.length * imageDataWidth, imageDataHeight),
      rContext = resultCanvas.getContext('2d');

  imageDataArr.forEach((data, i) => {
    tmpContext.putImageData(data, 0, 0);
    rContext.drawImage(
      tmpCanvas,
      i * imageDataWidth,
      0,
      imageDataWidth,
      imageDataHeight
    );
  });

  return resultCanvas;
};
