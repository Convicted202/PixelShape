import { StateSelector, SerializationSchema } from './StateSerialization';
import { uuid, setInitialCounter, uniqueId } from '../utils/uuid';

import { getApplication } from '../selectors/application';
import { getFrames } from '../selectors/frames';

import ImageDataCompressor from './ImageDataCompressor';

export class StateConverter {
  static hydrateOnImport (fromObj, toObj, schemaType) {
    Object.keys(schemaType)
      .forEach(path => {
        let hashes = path.split('.'),
            subObj = toObj;

        // go deep through all path to the last hash
        hashes.forEach((hash, i) => {
          subObj[hash] = subObj[hash] || {};
          if (i !== hashes.length - 1)
            subObj = subObj[hash];
        });

        // assign value to a key, equal to the last hash
        subObj[hashes[hashes.length - 1]] = fromObj[schemaType[path]];
      });
  }

  static convertToExport (stateData) {
    const stateClone = JSON.parse(JSON.stringify(stateData)),
          converted = { meta: {}, app: {} };

    let frames, size;

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

    Object.keys(frames)
      .forEach(frameId => {
        frames[frameId].naturalImageData.data = ImageDataCompressor.compress(
          frames[frameId].naturalImageData,
          size.width,
          size.height
        );
      });

    return converted;
  }

  static convertToImport (stateObj) {
    let converted = {}, width, height, frames, nums;

    StateConverter.hydrateOnImport(stateObj.app, converted, SerializationSchema._import);

    width = getApplication(converted).size.width;
    height = getApplication(converted).size.height;
    frames = getFrames(converted).collection;
    // create modifiedArray from all frames
    getFrames(converted).order.modifiedFramesArray = getFrames(converted).order.framesOrderArray.map(
        (el, key) => ({ [el]: key })
      );

    Object.keys(frames)
      .forEach(frameId => {
        frames[frameId].naturalImageData = ImageDataCompressor.decompress(
          frames[frameId].naturalImageData,
          width,
          height
        );
      });

    // to make sure if user loads this same project second time, it will have initial changes
    getApplication(converted).projectGuid = uuid();

    nums = getFrames(converted).order.framesOrderArray
      .map(el => +el.match(/\d+$/)[0]);

    // this is to make new ids start with a distinct proper value
    setInitialCounter(Math.max(...nums) + 1);

    return converted;
  }

  static createStateFromFramesData (frames, fps, width, height) {
    let converted = {}, id;

    const surrogate = {
      guid: uuid(),
      fps,
      size: {
        width,
        height
      },
      active: null,
      order: [],
      collection: {}
    };

    setInitialCounter(0);

    frames.forEach((frame, i) => {
      id = uniqueId();

      surrogate.order.push(id);
      surrogate.collection[id] = {
        name: 'default_' + i,
        naturalImageData: frame.data
      };
    });

    surrogate.active = id;

    StateConverter.hydrateOnImport(surrogate, converted, SerializationSchema._framesImport);

    getFrames(converted).order.modifiedFramesArray = getFrames(converted).order.framesOrderArray.map(
        (el, key) => ({ [el]: key })
      );

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
