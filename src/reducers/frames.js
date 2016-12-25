import {
  ADD_FRAME,
  MOVE_FRAME_RIGHT,
  MOVE_FRAME_LEFT,
  DUPLICATE_FRAME,
  UPDATE_FRAME_IMAGE_DATA,
  UPDATE_FRAME_NAME,
  SET_CURRENT_FRAME,
  REMOVE_FRAME,
  UPDATE_GIF_FRAMES_ARRAY,
  RESET_FRAMES_STATE,
  SET_FPS
} from 'actions/frames';

import uniqueId from 'utils/uuid';

// const initialState = {
//   currentFrame: null,
//   fps: 2,
//   framesDataArray: [],
//   framesOrder: [],
//   framesCollection: {
//     /*
//     frame looks like

//     uuid: {
//       index: '',
//       name: '',
//       imageData: []
//     }
//     */
//   }
// };

const
  framePrefix = 'frame_',
  frameName = 'default_';

// TODO: to be moved to defaults or configs
const frameSize = {width: 700, height: 700};

const id = uniqueId(framePrefix);

const initialState = {
  activeFrame: null,
  fps: 2,
  framesGifDataArray: [],
  framesOrderArray: [],
  framesCollectionObject: {
    uuid: {
      name: '',
      imageData: []
    }
  }
};

// create an empty first frame
initialState.activeFrame = id;
initialState.framesOrderArray.push(id);
initialState.framesCollectionObject[id] = {
  name: `${frameName}0`,
  imageData: new ImageData(frameSize.width, frameSize.height)
};


function frames (state = initialState, action) {
  let
    frame,
    framesOrderArray = [],
    framesCollectionObject = {},
    newState,
    activeFrame,
    index,
    id;

  switch (action.type) {
    case ADD_FRAME:
      id = uniqueId(framePrefix);
      framesOrderArray = [...state.framesOrderArray, id];
      framesCollectionObject[id] = {
        name: `${frameName}${state.framesOrderArray.length}`,
        imageData: new ImageData(frameSize.width, frameSize.height)
      };

      return Object.assign({}, state, {
        activeFrame: state.activeFrame,
        framesOrderArray,
        framesCollectionObject: Object.assign({}, state.framesCollectionObject, framesCollectionObject)
      });

    case UPDATE_FRAME_IMAGE_DATA:
      activeFrame = state.framesCollectionObject[action.frameUUID];
      frame = {};
      frame[action.frameUUID] = Object.assign({}, activeFrame, { imageData: action.imageData });
      framesCollectionObject = Object.assign({}, state.framesCollectionObject, frame);
      return Object.assign({}, state, { framesCollectionObject });

    case MOVE_FRAME_RIGHT:
      index = state.framesOrderArray.findIndex(el => el === action.uuid);
      if (index === state.framesOrderArray.length - 1) return state;

      framesOrderArray = [
        ...state.framesOrderArray.slice(0, index),
        state.framesOrderArray[index + 1],
        state.framesOrderArray[index]
      ];

      if (state.framesOrderArray.length > index + 2)
        framesOrderArray = [...framesOrderArray, ...state.framesOrderArray.slice(index + 2)];

      return Object.assign({}, state, { framesOrderArray });

    case MOVE_FRAME_LEFT:
      index = state.framesOrderArray.findIndex(el => el === action.uuid);
      if (index === 0) return state;

      framesOrderArray = [
        ...state.framesOrderArray.slice(0, index - 1),
        state.framesOrderArray[index],
        state.framesOrderArray[index - 1]
      ];

      if (state.framesOrderArray.length > index + 1)
        framesOrderArray = [...framesOrderArray, ...state.framesOrderArray.slice(index + 1)];

      return Object.assign({}, state, { framesOrderArray });

    case DUPLICATE_FRAME:
      index = state.framesOrderArray.findIndex(el => el === action.uuid);
      id = uniqueId(framePrefix);

      const
        currentImgData = state.framesCollectionObject[action.uuid].imageData,
        imageData = new ImageData(currentImgData.width, currentImgData.height),
        dataCopy = new Uint8ClampedArray(currentImgData.data);

      imageData.data.set(dataCopy);

      framesCollectionObject[id] = {
        name: `${state.framesCollectionObject[action.uuid].name}_copy`,
        imageData
      };

      framesOrderArray = [...state.framesOrderArray.slice(0, index + 1), id];

      if (state.framesOrderArray[index + 1])
        framesOrderArray = [...framesOrderArray, ...state.framesOrderArray.splice(index + 1)];

      return Object.assign({}, state, {
        framesOrderArray,
        framesCollectionObject: Object.assign({}, state.framesCollectionObject, framesCollectionObject)
      });

    case UPDATE_FRAME_NAME:
      activeFrame = state.framesCollectionObject[action.frameUUID];
      frame = {};
      frame[action.frameUUID] = Object.assign({}, activeFrame, { name: action.name });
      framesCollectionObject = Object.assign({}, state.framesCollectionObject, frame);
      return Object.assign({}, state, { framesCollectionObject });

    case SET_CURRENT_FRAME:
      return Object.assign({}, state, { activeFrame: action.uuid });

    case REMOVE_FRAME:
      index = state.framesOrderArray.findIndex(el => el === action.uuid);
      if (state.framesOrderArray.length === 1) return state;

      framesOrderArray = [...state.framesOrderArray.slice(0, index)];

      if (state.framesOrderArray[index + 1]) {
        framesOrderArray = [...framesOrderArray, ...state.framesOrderArray.slice(index + 1)];
        activeFrame = state.framesOrderArray[index + 1];
      } else
        activeFrame = state.framesOrderArray[index - 1];

      newState = Object.assign({}, state, { activeFrame, framesOrderArray });
      delete newState.framesCollectionObject[action.uuid];
      return Object.assign(newState);

    case UPDATE_GIF_FRAMES_ARRAY:
      return Object.assign({}, state, { framesGifDataArray: action.framesGifDataArray });
    case SET_FPS:
      return Object.assign({}, state, { fps: action.fps });

    case RESET_FRAMES_STATE:
      return Object.assign({}, initialState);

    default:
      return state;
  }
}

export default frames;
