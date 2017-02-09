import sinon from 'sinon';
import ImageData from './ImageData.mock';

const methods = [
  'fillRect',     'clearRect',
  'putImageData', 'setTransform',
  'drawImage',    'save',
  'fillText',     'restore',
  'beginPath',    'moveTo',
  'lineTo',       'closePath',
  'stroke',       'translate',
  'scale',        'rotate',
  'arc',          'fill',
  'strokeRect'
];

class RenderingContext2d {
  constructor() {
    this.canvas = { width: 100, height: 100 };
  }
  getImageData(x, y, w, h) { return new ImageData(100, 100) }
  createImageData() { return []; }
};

// adding spies replacing all available CanvasRenderingContext2D methods
methods.forEach((method) => {
  RenderingContext2d.prototype[method] = sinon.spy();
});

export default RenderingContext2d;
