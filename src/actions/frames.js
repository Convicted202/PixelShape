export const ADD_FRAME = 'ADD_FRAME';
export const REMOVE_FRAME = 'REMOVE_FRAME';
export const UPDATE_FRAME_IMAGE_DATA = 'UPDATE_FRAME_IMAGE_DATA';
export const UPDATE_FRAME = 'UPDATE_FRAME';
export const SET_CURRENT_FRAME = 'SET_CURRENT_FRAME';

export const addFrame = frame => ({
  type: ADD_FRAME,
  frame
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

export const updateFrame = frame => ({
  type: UPDATE_FRAME,
  frame
});

export const setCurrentFrame = uuid => ({
  type: SET_CURRENT_FRAME,
  uuid
});

