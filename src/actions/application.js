export const SET_IMAGE_SIZE = 'APP:SET_SIZE';
export const SET_SURFACE_CONSTRAINTS = 'APP:SET_SURFACE_CONSTRAINTS';
export const TOGGLE_GRID = 'APP:TOGGLE_GRID';

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

export const toggleGrid = () => ({
  type: TOGGLE_GRID
});
