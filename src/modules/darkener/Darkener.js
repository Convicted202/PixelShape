import ColorAdjust from '../coloradjust/ColorAdjust';

class Darkener extends ColorAdjust {
  constructor (...args) {
    super(...args);
    this.shadingPercentage = -0.01;
  }
}

export default Darkener;
