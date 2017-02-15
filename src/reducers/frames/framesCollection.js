import { framesCollectionInitialState, defaults } from './initialState';

import {
  ADD_FRAME,
  UPDATE_FRAME_IMAGE_DATA,
  DUPLICATE_FRAME,
  UPDATE_FRAME_NAME,
  REMOVE_FRAME,
  UPDATE_FRAMES_SIZE,
  RESET_FRAMES_STATE
} from '../../actions/frames';

import { expandImageData } from '../../utils/canvasUtils';

function framesCollection (state = framesCollectionInitialState(), action) {
  let framesCollectionObject = {},
      chosenFrame,
      newState;

  switch (action.type) {
    case ADD_FRAME:
      framesCollectionObject[action.id] = {
        name: `${defaults.frameName}${action.id}`,
        naturalImageData: new ImageData(action.width, action.height)
      };

      return {
        ...state,
        ...framesCollectionObject
      };

    case UPDATE_FRAME_IMAGE_DATA:
      chosenFrame = state[action.frameUUID];

      framesCollectionObject[action.frameUUID] = {
        ...chosenFrame,
        naturalImageData: action.naturalImageData
      };

      return {
        ...state,
        ...framesCollectionObject
      };

    case DUPLICATE_FRAME:
      const currentNaturalImgData = state[action.uuid].naturalImageData,
            naturalImageData = new ImageData(currentNaturalImgData.width, currentNaturalImgData.height),
            naturalDataCopy = new Uint8ClampedArray(currentNaturalImgData.data);

      naturalImageData.data.set(naturalDataCopy);

      framesCollectionObject[action.id] = {
        name: `${state[action.uuid].name}_copy`,
        naturalImageData
      };

      return {
        ...state,
        ...framesCollectionObject
      };

    case UPDATE_FRAME_NAME:
      chosenFrame = state[action.frameUUID];

      framesCollectionObject[action.frameUUID] = {
        ...chosenFrame,
        name: action.name
      };

      return {
        ...state,
        ...framesCollectionObject
      };

    case REMOVE_FRAME:
      newState = { ...state };
      delete newState[action.uuid];

      return { ...newState };

    case UPDATE_FRAMES_SIZE:
      Object.keys(state).forEach(id => {
        framesCollectionObject[id] = {
          name: state[id].name,
          naturalImageData: expandImageData(
            state[id].naturalImageData,
            action.width,
            action.height,
            action.anchor,
            action.stretch
          )
        };
      });

      return { ...framesCollectionObject };

    case RESET_FRAMES_STATE:
      let id;

      newState = { ...framesCollectionInitialState() };
      id = Object.keys(newState)[0];

      newState[id].naturalImageData = new ImageData(defaults.frameSize.naturalWidth, defaults.frameSize.naturalHeight);

      return newState;

    default:
      return state;
  }
}

export default framesCollection;
