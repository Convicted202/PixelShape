import Boundshape from '../boundshape/Boundshape';
import {ellipse} from '../../utils/ellipseCircle';

class Ellipse extends Boundshape {
  constructor (...args) {
    super(...args);
  }

  draw (/* ctx, x0, y0, x1, y1 */) {
    super.draw(...arguments);
    ellipse(this.drawPixelCell.bind(this), ...arguments);
  }
}

export default Ellipse;
