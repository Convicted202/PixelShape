import { updateFramesSize } from './frames';
import StateManager from 'fileloaders/StateManager';

export const SET_IMAGE_SIZE = 'APP:SET_SIZE';
export const SET_SURFACE_CONSTRAINTS = 'APP:SET_SURFACE_CONSTRAINTS';
export const TOGGLE_RESET_PALETTE = 'APP:TOGGLE_RESET_PALETTE';
export const TOGGLE_GRID = 'APP:TOGGLE_GRID';
export const TOGGLE_STRETCH = 'APP:TOGGLE_STRETCH';
export const SET_EXPAND_ANCHOR = 'APP:SET_EXPAND_ANCHOR';
export const UPLOAD_STORE = 'APP:UPLOAD_STORE';

export const setImageSize = (width, height) => ({
  type: SET_IMAGE_SIZE,
  width,
  height
});

export const setSurfaceConstraints = (width, height) => ({
  type: SET_SURFACE_CONSTRAINTS,
  width,
  height
});

export const setExpandAnchor = anchor => ({
  type: SET_EXPAND_ANCHOR,
  anchor
});

export const toggleResetPalette = () => ({
  type: TOGGLE_RESET_PALETTE
});

export const toggleGrid = () => ({
  type: TOGGLE_GRID
});

export const toggleStretch = () => ({
  type: TOGGLE_STRETCH
});

export const processSizeChange = (width, height, stretch) => (dispatch, getState) => {
  dispatch(setImageSize(width, height));
  dispatch(updateFramesSize(width, height, getState().application.anchor, stretch));
};

export const downloadStore = fileName => (dispatch, getState) => {
  const state = getState();
  StateManager.prepareAndDownload(state, fileName);
};

export const uploadStore = data => ({
  type: UPLOAD_STORE,
  data
});
