export const SET_IMAGE_SIZE = 'APP:SET_SIZE';
export const SET_SURFACE_CONSTRAINTS = 'APP:SET_SURFACE_CONSTRAINTS';

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
