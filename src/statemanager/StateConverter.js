import { StateSelector, SerializationSchema } from './StateSerialization';
import { uuid } from 'utils/uuid';

export class StateConverter {
  // TODO: iData should be converted to Array containing ONLY HEX values
  // without # signs and without commas and then glued together into one string
  static convertToExport (stateData) {
    const stateClone = JSON.parse(JSON.stringify(stateData)),
          converted = { meta: {}, app: {} };

    let frames, size, iData, iDataLength;

    // attach metadata
    Object.keys(SerializationSchema.meta)
      .forEach(key => {
        converted.meta[key] = SerializationSchema.meta[key];
      });

    // attach app data
    Object.keys(SerializationSchema._export)
      .forEach(key => {
        converted.app[key] = StateSelector[SerializationSchema._export[key]](stateClone);
      });

    frames = converted.app.frames;
    size = converted.app.size;
    iDataLength = size.height * size.width * 4;

    Object.keys(frames)
      .forEach(frameId => {
        iData = frames[frameId].naturalImageData.data;

        // iData from converted is now an Object since we used JSON.stringify on TypedArray
        // => convert it to Array
        iData.length = iDataLength;
        iData = Array.from(Array.prototype.slice.call(iData, 0));

        frames[frameId].naturalImageData.data = iData;
      });

    return converted;
  }

  static convertToImport (stateObj) {
    let converted = {}, width, height, frames;

    // do something to make state applicable to current store shape
    Object.keys(SerializationSchema._import)
      .forEach(path => {
        let [top, inner] = path.split('.');

        converted[top] = converted[top] || {};
        converted[top][inner] = stateObj.app[SerializationSchema._import[path]];
      });

    width = converted.application.size.width;
    height = converted.application.size.height;
    frames = converted.frames.framesCollectionObject;
    // create modifiedArray from all frames
    converted.frames.modifiedFramesArray = converted.frames.framesOrderArray.map(
      (el, key) => ({ [el]: key })
    );

    Object.keys(frames)
      .forEach(frameId => {
        let iData = frames[frameId].naturalImageData.data;

        // first convert iData from Object to Uint8ClampedArray
        // then create ImageData from it
        iData.length = width * height * 4;
        iData = new ImageData(new Uint8ClampedArray(iData), width, height);

        frames[frameId].naturalImageData = iData;
      });

    // to make sure if user loads this same project second time, it will have initial changes
    converted.application.projectGuid = uuid();

    return converted;
  }

  static mergeImportedState (state, imported) {
    const application = Object.assign({}, state.application, imported.application),
          frames = Object.assign({}, state.frames, imported.frames);

    return Object.assign({}, state, { application, frames });
  }
}
