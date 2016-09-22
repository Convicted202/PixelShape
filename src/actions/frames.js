export const ADD_FRAME = 'ADD_FRAME';
export const REMOVE_FRAME = 'REMOVE_FRAME';
export const UPDATE_FRAME_IMAGE_DATA = 'UPDATE_FRAME_IMAGE_DATA';
export const UPDATE_FRAME_INDEX = 'UPDATE_FRAME_INDEX';
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

export const updateFrameIndex = (frameUUID, index) => ({
  type: UPDATE_FRAME_INDEX,
  frameUUID,
  index
});

export const setCurrentFrame = uuid => ({
  type: SET_CURRENT_FRAME,
  uuid
});

