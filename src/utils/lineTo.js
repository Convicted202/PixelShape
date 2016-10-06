const getSlope = (x1, x2, y1, y2) => {
  const
    dx = x2 - x1,
    dy = Math.abs(y2 - y1);

  return dy / dx;
};

/**
* Bresenham's line algorithm
*/
export default (drawPointCallback, renderingContext, x1, y1, x2, y2) => {
  let x, y, error = 0;
  const steep = (Math.abs(y2 - y1) > Math.abs(x2 - x1));
  if (steep) {
    [x1, y1] = [y1, x1];
    [x2, y2] = [y2, x2];
  }
  if (x1 > x2) {
    [x1, x2] = [x2, x1];
    [y1, y2] = [y2, y1];
  }

  [x, y] = [x1, y1];

  const slope = getSlope(x1, x2, y1, y2);
  const yStep = y1 < y2 ? 1 : -1;

  // moving through all the points in the range
  for (; x < x2; x++) {
    if (steep) drawPointCallback(renderingContext, y, x);
    else drawPointCallback(renderingContext, x, y);

    error += slope;
    if (error >= 0.5) {
      y += yStep;
      error -= 1.0;
    }
  }
};
