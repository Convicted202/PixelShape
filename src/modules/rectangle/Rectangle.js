import Boundshape from '../boundshape/Boundshape';

class Rectangle extends Boundshape {
  constructor(...args) {
    super(...args);
  }

  draw(ctx, x0, y0, x1, y1) {
    super.draw(...arguments);
    ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
  }
}

export default Rectangle;
