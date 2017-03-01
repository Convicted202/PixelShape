import MirrorBrush from '../mirrorbrush/MirrorBrush';

class VertMirrorBrush extends MirrorBrush {
  constructor (...args) {
    super(...args);
    this.shift = {
      x: true,
      y: false
    };
  }
}

export default VertMirrorBrush;
