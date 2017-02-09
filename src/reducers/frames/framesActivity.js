import { framesActivityInitialState } from './initialState';

import {
  SET_CURRENT_FRAME,
  REMOVE_FRAME,
  UPDATE_FRAME_GIF_DATA,
  SET_FPS,
  RESET_FRAMES_STATE
} from 'actions/frames';

function framesActivity (state = framesActivityInitialState, action) {
  let framesGifData;

  switch (action.type) {
    case SET_CURRENT_FRAME:
      return { ...state, activeFrame: action.uuid };

    case REMOVE_FRAME:
      framesGifData = { ...state.framesGifData };
      delete framesGifData[action.uuid];

      return { ...state, framesGifData };

    case UPDATE_FRAME_GIF_DATA:
      return {
        ...state,
        framesGifData: { ...state.framesGifData, ...{ [action.frameUUID]: action.frameData }}
      };

    case SET_FPS:
      return { ...state, fps: action.fps };

    case RESET_FRAMES_STATE:
      return { ...framesActivityInitialState };

    default:
      return state;
  }
}

export default framesActivity;
