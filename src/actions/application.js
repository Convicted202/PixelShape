import { updateFramesSize } from './frames';

export const SET_IMAGE_SIZE = 'APP:SET_SIZE';
export const SET_SURFACE_CONSTRAINTS = 'APP:SET_SURFACE_CONSTRAINTS';
export const TOGGLE_GRID = 'APP:TOGGLE_GRID';
export const SET_EXPAND_ANCHOR = 'APP:SET_EXPAND_ANCHOR';

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

export const toggleGrid = () => ({
  type: TOGGLE_GRID
});

export const processSizeChange = (width, height) => (dispatch, getState) => {
  dispatch(setImageSize(width, height));
  dispatch(updateFramesSize(width, height, getState().application.anchor));
};
