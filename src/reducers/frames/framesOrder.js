import { framesOrderInitialState } from './initialState';

import {
  ADD_FRAME,
  UPDATE_FRAME_IMAGE_DATA,
  MOVE_FRAME_RIGHT,
  MOVE_FRAME_LEFT,
  DUPLICATE_FRAME,
  REMOVE_FRAME,
  SET_FPS,
  UPDATE_FRAMES_SIZE,
  RESET_FRAMES_STATE
} from '../../actions/frames';

import Immutable from '../../utils/immutableArray';

function framesOrder (state = framesOrderInitialState(), action) {
  let framesOrderArray,
      modifiedFramesArray,
      activeFrame,
      index;

  switch (action.type) {
    case ADD_FRAME:
      framesOrderArray = Immutable.push(state.framesOrderArray, action.id);
      // take last two from framesOrderArray stored as {el: key}
      modifiedFramesArray = framesOrderArray.map(
        (el, key) => ({ [el]: key })
      ).slice(-2);

      return {
        ...state,
        framesOrderArray,
        modifiedFramesArray
      };

    case UPDATE_FRAME_IMAGE_DATA:
      modifiedFramesArray = [{ [action.frameUUID]: state.framesOrderArray.indexOf(action.frameUUID) }];

      return {
        ...state,
        modifiedFramesArray
      };

    case MOVE_FRAME_RIGHT:
      index = state.framesOrderArray.findIndex(el => el === action.uuid);
      if (index === state.framesOrderArray.length - 1) return state;

      framesOrderArray = Immutable.swapWithNext(state.framesOrderArray, index);

      modifiedFramesArray = [
        { [state.framesOrderArray[index + 1]]: index },
        { [state.framesOrderArray[index]]: index + 1}
      ];

      return {
        ...state,
        framesOrderArray,
        modifiedFramesArray
      };

    case MOVE_FRAME_LEFT:
      index = state.framesOrderArray.findIndex(el => el === action.uuid);
      if (index === 0) return state;

      framesOrderArray = Immutable.swapWithPrevious(state.framesOrderArray, index);

      modifiedFramesArray = [
        { [state.framesOrderArray[index]]: index - 1 },
        { [state.framesOrderArray[index - 1]]: index}
      ];

      return {
        ...state,
        framesOrderArray,
        modifiedFramesArray
      };

    case DUPLICATE_FRAME:
      index = state.framesOrderArray.findIndex(el => el === action.uuid);

      framesOrderArray = Immutable.insert(state.framesOrderArray, action.id, index);

      modifiedFramesArray = [
        { [action.uuid]: index },
        { [action.id]: index + 1 }
      ];

      return {
        ...state,
        framesOrderArray,
        modifiedFramesArray
      };

    case REMOVE_FRAME:
      let nextIndex;

      index = state.framesOrderArray.findIndex(el => el === action.uuid);
      if (state.framesOrderArray.length === 1) return state;

      framesOrderArray = Immutable.remove(state.framesOrderArray, index);

      nextIndex = framesOrderArray[index] ? index : index - 1;

      activeFrame = framesOrderArray[nextIndex];
      modifiedFramesArray = [{ [activeFrame]: nextIndex }];

      return {
        ...state,
        framesOrderArray,
        modifiedFramesArray
      };

    case SET_FPS:
    case UPDATE_FRAMES_SIZE:
      // fps is stored in all frames so need to update all of them
      modifiedFramesArray = state.framesOrderArray.map(
        (el, key) => ({ [el]: key })
      );

      return {
        ...state,
        modifiedFramesArray
      };

    case RESET_FRAMES_STATE:
      return {
        ...framesOrderInitialState()
      };

    default:
      return state;
  }
}

export default framesOrder;
