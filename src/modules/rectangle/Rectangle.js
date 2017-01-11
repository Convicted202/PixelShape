import Boundshape from '../boundshape/Boundshape';
import lineTo from 'utils/lineTo';

class Rectangle extends Boundshape {
  constructor (...args) {
    super(...args);
  }

  shiftByHalfSize (x, y) {
    return {
      x: x + Math.round(this.state.size / 2),
      y: y + Math.round(this.state.size / 2)
    };
  }

  draw (ctx, x0, y0, x1, y1) {
    const start     = this.getPixeledCoords(x0, y0),
          end       = this.getPixeledCoords(x1, y1),
          realStart = this.shiftByHalfSize(start.x, start.y),
          realEnd   = this.shiftByHalfSize(end.x, end.y);

    super.draw(...arguments);
    // ctx.strokeRect(realStart.x, realStart.y, realEnd.x - realStart.x, realEnd.y - realStart.y);

    lineTo(this.drawPixelCell.bind(this), ctx, realStart.x, realStart.y, realEnd.x, realStart.y);
    lineTo(this.drawPixelCell.bind(this), ctx, realEnd.x, realStart.y, realEnd.x, realEnd.y);
    lineTo(this.drawPixelCell.bind(this), ctx, realStart.x, realStart.y, realStart.x, realEnd.y);
    lineTo(this.drawPixelCell.bind(this), ctx, realStart.x, realEnd.y, realEnd.x, realEnd.y);
  }
}

export default Rectangle;
