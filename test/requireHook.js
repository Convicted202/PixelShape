import ImageData from './mocks/ImageData.mock';
import RenderingContext2d from './mocks/RenderingContext2d.mock';

global.document= {
  createElement (element) {
    if (element === 'canvas')
      return {
        getContext () {
          return new RenderingContext2d();
        }
      }
    return {};
  }
};

global.ImageData = ImageData;
global.RenderingContext2d = RenderingContext2d;
