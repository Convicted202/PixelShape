import MirrorBrush from '../mirrorbrush/MirrorBrush';

class HorzMirrorBrush extends MirrorBrush {
  constructor (...args) {
    super(...args);
    this.shift = {
      x: false,
      y: true
    };
  }
}

export default HorzMirrorBrush;
