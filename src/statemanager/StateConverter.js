import { StateSelector, SerializationSchema } from './StateSerialization';
import { uuid, setInitialCounter } from '../utils/uuid';

import { getApplication } from '../selectors/application';
import { getFrames } from '../selectors/frames';

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
    let converted = {}, width, height, frames, nums;

    Object.keys(SerializationSchema._import)
      .forEach(path => {
        let hashes = path.split('.'),
            subObj = converted;

        // go deep through all path to the last hash
        hashes.forEach((hash, i) => {
          subObj[hash] = subObj[hash] || {};
          if (i !== hashes.length - 1)
            subObj = subObj[hash];
        });

        // assign value to a key, equal to the last hash
        subObj[hashes[hashes.length - 1]] = stateObj.app[SerializationSchema._import[path]];
      });

    width = getApplication(converted).size.width;
    height = getApplication(converted).size.height;
    frames = getFrames(converted).collection;
    // create modifiedArray from all frames
    getFrames(converted).order.modifiedFramesArray = getFrames(converted).order.framesOrderArray.map(
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
    getApplication(converted).projectGuid = uuid();

    nums = getFrames(converted).order.framesOrderArray
      .map(el => +el.match(/\d+$/)[0]);

    // this is to make new ids start with a distinct proper value
    setInitialCounter(Math.max(...nums) + 1);

    return converted;
  }

  static mergeImportedState (state, imported) {
    const application = Object.assign({}, getApplication(state), getApplication(imported)),
          frames = Object.assign({}, getFrames(state), getFrames(imported));

    return Object.assign({}, state, {
      undoables: {
        present: {
          frames,
          application
        },
        past: [],
        future: []
      }
    });
  }
}
