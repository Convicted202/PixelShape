import {
  ADD_FRAME,
  UPDATE_FRAME_INDEX,
  UPDATE_FRAME_IMAGE_DATA,
  UPDATE_FRAME_NAME,
  SET_CURRENT_FRAME,
  REMOVE_FRAME,
  SET_FPS
} from 'actions/frames';

const initialState = {
  currentFrame: null,
  fps: 2,
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

function frames (state = initialState, action) {
  let frame, framesCollection, newState, currentFrame;

  switch (action.type) {
    case ADD_FRAME:
      const { index, name, imageData, uuid } = action.frame;
      frame = {};
      frame[uuid] = { index, name, imageData};
      framesCollection = Object.assign({}, state.framesCollection, frame);
      return Object.assign({}, state, { framesCollection });
    case UPDATE_FRAME_IMAGE_DATA:
      currentFrame = state.framesCollection[action.frameUUID];
      frame = {};
      frame[action.frameUUID] = Object.assign({}, currentFrame, { imageData: action.imageData });
      framesCollection = Object.assign({}, state.framesCollection, frame);
      return Object.assign({}, state, { framesCollection });
    case UPDATE_FRAME_INDEX:
      currentFrame = state.framesCollection[action.frameUUID];
      frame = {};
      frame[action.frameUUID] = Object.assign({}, currentFrame, { index: action.index });
      framesCollection = Object.assign({}, state.framesCollection, frame);
      return Object.assign({}, state, { framesCollection });
    case UPDATE_FRAME_NAME:
      currentFrame = state.framesCollection[action.frameUUID];
      frame = {};
      frame[action.frameUUID] = Object.assign({}, currentFrame, { name: action.name });
      framesCollection = Object.assign({}, state.framesCollection, frame);
      return Object.assign({}, state, { framesCollection });
    case SET_CURRENT_FRAME:
      return Object.assign({}, state, { currentFrame: action.uuid });
    case REMOVE_FRAME:
      newState = Object.assign({}, state);
      delete newState.framesCollection[action.uuid]
      return Object.assign(newState);
    case SET_FPS:
      return Object.assign({}, state, { fps: action.fps });
    default:
      return state;
  }
}

export default frames;
