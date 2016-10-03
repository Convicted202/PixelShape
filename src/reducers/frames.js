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

const initialState = {
  currentFrame: null,
  fps: 2,
  framesDataArray: [],
  framesOrder: [],
  framesCollection: {
    /*
    frame looks like

    uuid: {
      index: '',
      name: '',
      imageData: []
    }
    */
  }
}

// TODO: to be moved to defaults or configs
const frameSize = {width: 700, height: 700};

function frames (state = initialState, action) {
  const framePrefix = 'frame_',
        frameName = 'default_';

  let frame,
      framesOrder = [],
      framesCollection = {},
      newState,
      currentFrame,
      index,
      id

  switch (action.type) {
    case ADD_FRAME:
      id = uniqueId(framePrefix);
      framesOrder = [...state.framesOrder, id];
      framesCollection[id] = {
        name: `${frameName}${state.framesOrder.length}`,
        imageData: new ImageData(frameSize.width, frameSize.height)
      };

      return Object.assign({}, state, {
        currentFrame: state.currentFrame ? state.currentFrame : id,
        framesOrder,
        framesCollection: Object.assign({}, state.framesCollection, framesCollection)
      });

    case UPDATE_FRAME_IMAGE_DATA:
      currentFrame = state.framesCollection[action.frameUUID];
      frame = {};
      frame[action.frameUUID] = Object.assign({}, currentFrame, { imageData: action.imageData });
      framesCollection = Object.assign({}, state.framesCollection, frame);
      return Object.assign({}, state, { framesCollection });

    case MOVE_FRAME_RIGHT:
      index = state.framesOrder.findIndex(el => el === action.uuid);
      if (index === state.framesOrder.length - 1) return state;

      framesOrder = [
        ...state.framesOrder.slice(0, index),
        state.framesOrder[index + 1],
        state.framesOrder[index]
      ];

      if (state.framesOrder.length > index + 2) {
        framesOrder = [...framesOrder, ...state.framesOrder.slice(index + 2)];
      }

      return Object.assign({}, state, { framesOrder });

    case MOVE_FRAME_LEFT:
      index = state.framesOrder.findIndex(el => el === action.uuid);
      if (index === 0) return state;

      framesOrder = [
        ...state.framesOrder.slice(0, index - 1),
        state.framesOrder[index],
        state.framesOrder[index - 1]
      ];

      if (state.framesOrder.length > index + 1) {
        framesOrder = [...framesOrder, ...state.framesOrder.slice(index + 1)];
      }

      return Object.assign({}, state, { framesOrder });

    case DUPLICATE_FRAME:
      index = state.framesOrder.findIndex(el => el === action.uuid);
      id = uniqueId(framePrefix);

      const currentImgData = state.framesCollection[action.uuid].imageData,
            imageData = new ImageData(currentImgData.width, currentImgData.height),
            dataCopy = new Uint8ClampedArray(currentImgData.data);

      imageData.data.set(dataCopy);

      framesCollection[id] = {
        name: `${state.framesCollection[action.uuid].name}_copy`,
        imageData
      };

      framesOrder = [...state.framesOrder.slice(0, index + 1), id];
      if (state.framesOrder[index + 1]) {
        framesOrder = [...framesOrder, ...state.framesOrder.splice(index + 1)];
      }

      return Object.assign({}, state, {
        framesOrder,
        framesCollection: Object.assign({}, state.framesCollection, framesCollection)
      });

    case UPDATE_FRAME_NAME:
      currentFrame = state.framesCollection[action.frameUUID];
      frame = {};
      frame[action.frameUUID] = Object.assign({}, currentFrame, { name: action.name });
      framesCollection = Object.assign({}, state.framesCollection, frame);
      return Object.assign({}, state, { framesCollection });

    case SET_CURRENT_FRAME:
      return Object.assign({}, state, { currentFrame: action.uuid });

    case REMOVE_FRAME:
      index = state.framesOrder.findIndex(el => el === action.uuid);
      if (state.framesOrder.length === 1) return state;

      framesOrder = [...state.framesOrder.slice(0, index)];

      if (state.framesOrder[index + 1]) {
        framesOrder = [...framesOrder, ...state.framesOrder.slice(index + 1)];
        currentFrame = state.framesOrder[index + 1];
      } else {
        currentFrame = state.framesOrder[index - 1];
      }

      newState = Object.assign({}, state, { currentFrame, framesOrder });
      delete newState.framesCollection[action.uuid]
      return Object.assign(newState);

    case UPDATE_GIF_FRAMES_ARRAY:
      return Object.assign({}, state, { framesDataArray: action.framesDataArray });
    case SET_FPS:
      return Object.assign({}, state, { fps: action.fps });

    case RESET_FRAMES_STATE:
      return Object.assign({}, initialState);

    default:
      return state;
  }
}

export default frames;
