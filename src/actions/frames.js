export const ADD_FRAME = 'ADD_FRAME';
export const REMOVE_FRAME = 'REMOVE_FRAME';
export const UPDATE_FRAME_IMAGE_DATA = 'UPDATE_FRAME_IMAGE_DATA';
export const UPDATE_FRAME_INDEX = 'UPDATE_FRAME_INDEX';
export const UPDATE_FRAME_NAME = 'SET_FRAME_NAME';
export const SET_CURRENT_FRAME = 'SET_CURRENT_FRAME';
export const UPDATE_GIF_FRAMES_ARRAY = 'UPDATE_GIF_FRAMES_ARRAY';
export const SET_FPS = 'SET_FPS';

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
