import atob from 'atob';
import Blob from 'w3c-blob';
import File from 'File';
import FileReader from 'filereader';
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

global.FileReader = FileReader;
global.atob = atob;
global.Blob = Blob;
global.File = File;
global.ImageData = ImageData;
global.RenderingContext2d = RenderingContext2d;
