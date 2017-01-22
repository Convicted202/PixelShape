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
