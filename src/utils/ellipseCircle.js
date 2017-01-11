/**
* Bresenham's ellipse algorithm
*/
const ellipse = (drawPointCallback, renderingContext, x0, y0, x1, y1) => {
  const [width, height] = [Math.abs(x1 - x0), Math.abs(y1 - y0)],
        [xc, yc]        = [Math.min(x0, x1) + width / 2, Math.min(y0, y1) + height / 2],
        [a2, b2]        = [width * width, height * height],
        [fa2, fb2]      = [4 * a2, 4 * b2];

  let x, y, sigma;

  // without this we will run ourself into infinite loop in the first half
  // if a2 === 0 and b2 === 0 then b2 * x === a2 *y === 0
  if (!a2 && !b2) {
    drawPointCallback(renderingContext, xc, yc);
    return;
  }

  /* first half */
  x = 0;
  y = height;
  sigma = 2 * b2 + a2 * (1 - 2 * height);
  for (; b2 * x <= a2 * y; x++) {
    drawPointCallback(renderingContext, xc + x, yc + y);
    drawPointCallback(renderingContext, xc - x, yc + y);
    drawPointCallback(renderingContext, xc + x, yc - y);
    drawPointCallback(renderingContext, xc - x, yc - y);
    if (sigma >= 0) {
      sigma += fa2 * (1 - y);
      y--;
    }
    sigma += b2 * ((4 * x) + 6);
  }

  /* second half */
  x = width;
  y = 0;
  sigma = 2 * a2 + b2 * (1 - 2 * width);
  for (; a2 * y <= b2 * x; y++) {
    drawPointCallback(renderingContext, xc + x, yc + y);
    drawPointCallback(renderingContext, xc - x, yc + y);
    drawPointCallback(renderingContext, xc + x, yc - y);
    drawPointCallback(renderingContext, xc - x, yc - y);
    if (sigma >= 0) {
      sigma += fb2 * (1 - x);
      x--;
    }
    sigma += a2 * ((4 * y) + 6);
  }
};

const circle = () => {

};

export {ellipse, circle};
