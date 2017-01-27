export const ADD_FRAME = 'ADD_FRAME';
export const REMOVE_FRAME = 'REMOVE_FRAME';
export const UPDATE_FRAME_IMAGE_DATA = 'UPDATE_FRAME_IMAGE_DATA';
export const MOVE_FRAME_RIGHT = 'MOVE_FRAME_RIGHT';
export const MOVE_FRAME_LEFT = 'MOVE_FRAME_LEFT';
export const DUPLICATE_FRAME = 'DUPLICATE_FRAME';
export const UPDATE_FRAME_NAME = 'SET_FRAME_NAME';
export const SET_CURRENT_FRAME = 'SET_CURRENT_FRAME';
export const UPDATE_FRAME_GIF_DATA = 'UPDATE_FRAME_GIF_DATA';
export const RESET_FRAMES_STATE = 'RESET_FRAMES_STATE';
export const SET_FPS = 'SET_FPS';
export const UPDATE_FRAMES_SIZE = 'UPDATE_FRAMES_SIZE';

export const addFrame = (width, height) => ({
  type: ADD_FRAME,
  width,
  height
});

export const removeFrame = uuid => ({
  type: REMOVE_FRAME,
  uuid
});

export const updateFramesSize = (width, height, anchor) => ({
  type: UPDATE_FRAMES_SIZE,
  width,
  height,
  anchor
});

export const updateFrameImageData = (frameUUID, naturalImageData) => ({
  type: UPDATE_FRAME_IMAGE_DATA,
  frameUUID,
  naturalImageData
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

export const updateFrameGIFData = (frameUUID, frameData) => ({
  type: UPDATE_FRAME_GIF_DATA,
  frameUUID,
  frameData
});

export const setFPS = fps => ({
  type: SET_FPS,
  fps
});

export const resetFramesState = () => ({
  type: RESET_FRAMES_STATE
});
