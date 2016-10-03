export const ADD_FRAME = 'ADD_FRAME';
export const REMOVE_FRAME = 'REMOVE_FRAME';
export const UPDATE_FRAME_IMAGE_DATA = 'UPDATE_FRAME_IMAGE_DATA';
export const MOVE_FRAME_RIGHT = 'MOVE_FRAME_RIGHT';
export const MOVE_FRAME_LEFT = 'MOVE_FRAME_LEFT';
export const DUPLICATE_FRAME = 'DUPLICATE_FRAME';
export const UPDATE_FRAME_NAME = 'SET_FRAME_NAME';
export const SET_CURRENT_FRAME = 'SET_CURRENT_FRAME';
export const UPDATE_GIF_FRAMES_ARRAY = 'UPDATE_GIF_FRAMES_ARRAY';
export const RESET_FRAMES_STATE = 'RESET_FRAMES_STATE';
export const SET_FPS = 'SET_FPS';

export const addFrame = () => ({
  type: ADD_FRAME
});

export const removeFrame = uuid => ({
  type: REMOVE_FRAME,
  uuid
});

export const updateFrameImageData = (frameUUID, imageData) => ({
  type: UPDATE_FRAME_IMAGE_DATA,
  frameUUID,
  imageData
});

export const moveFrameRight = uuid => ({
  type: MOVE_FRAME_RIGHT,
  uuid
});

export const moveFrameLeft = uuid => ({
  type: MOVE_FRAME_LEFT,
  uuid
});

export const duplicateFrame = uuid => ({
  type: DUPLICATE_FRAME,
  uuid
});

export const updateFrameName = (frameUUID, name) => ({
  type: UPDATE_FRAME_NAME,
  frameUUID,
  name
});

export const setCurrentFrame = uuid => ({
  type: SET_CURRENT_FRAME,
  uuid
});

export const updateGifFramesArray = framesDataArray => ({
  type: UPDATE_GIF_FRAMES_ARRAY,
  framesDataArray
});

export const setFPS = fps => ({
  type: SET_FPS,
  fps
});

export const resetFramesState = () => ({
  type: RESET_FRAMES_STATE
});
