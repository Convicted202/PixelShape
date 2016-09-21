import {
  ADD_FRAME,
  UPDATE_FRAME,
  UPDATE_FRAME_IMAGE_DATA,
  SET_CURRENT_FRAME
} from 'actions/frames';

const initialState = {
  currentFrame: null,
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
  let frame, framesCollection;

  switch (action.type) {
    case ADD_FRAME:
      const { index, name, imageData } = action.frame;
      frame = {};
      frame[action.frame.uuid] = { index, name, imageData };
      framesCollection = Object.assign({}, state.framesCollection, frame);
      return Object.assign({}, state, { framesCollection });
    case UPDATE_FRAME_IMAGE_DATA:
      const currentFrame = state.framesCollection[action.frameUUID];
      frame = {};
      frame[action.frameUUID] = Object.assign({}, currentFrame, { imageData: action.imageData });
      framesCollection = Object.assign({}, state.framesCollection, frame);
      return Object.assign({}, state, { framesCollection });
    case SET_CURRENT_FRAME:
      return Object.assign({}, state, { currentFrame: action.uuid });
    default:
      return state;
  }
}

export default frames;
