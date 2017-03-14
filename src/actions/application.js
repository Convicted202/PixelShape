export const SET_IMAGE_SIZE = 'APP:SET_SIZE';
export const SET_SURFACE_CONSTRAINTS = 'APP:SET_SURFACE_CONSTRAINTS';
export const TOGGLE_RESET_PALETTE = 'APP:TOGGLE_RESET_PALETTE';
export const TOGGLE_GRID = 'APP:TOGGLE_GRID';
export const TOGGLE_STRETCH = 'APP:TOGGLE_STRETCH';
export const SET_EXPAND_ANCHOR = 'APP:SET_EXPAND_ANCHOR';
export const UPLOAD_STORE = 'APP:UPLOAD_STORE';

export const TOGGLE_INCLUDE_GIF = 'APP:TOGGLE_INCLUDE_GIF';
export const TOGGLE_INCLUDE_SPRITESHEET = 'APP:TOGGLE_INCLUDE_SPRITESHEET';
export const TOGGLE_INCLUDE_PROJECT = 'APP:TOGGLE_INCLUDE_PROJECT';
export const TOGGLE_INCLUDE_PALETTE = 'APP:TOGGLE_INCLUDE_PALETTE';

// anchor and stretch will be only used in frames reducer
// application reducer needs to know only about width and height
export const updateSize = (width, height, anchor, stretch) => ({
  type: SET_IMAGE_SIZE,
  width,
  height,
  anchor,
  stretch
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

export const toggleIncludeGif = () => ({
  type: TOGGLE_INCLUDE_GIF
});

export const toggleIncludeSpritesheet = () => ({
  type: TOGGLE_INCLUDE_SPRITESHEET
});

export const toggleIncludeProject = () => ({
  type: TOGGLE_INCLUDE_PROJECT
});

export const toggleIncludePalette = () => ({
  type: TOGGLE_INCLUDE_PALETTE
});

export const processSizeChange = (width, height, stretch) => (dispatch, getState) => {
  const anchor = getState().undoables.present.application.anchor;
  dispatch(updateSize(width, height, anchor, stretch));
};

export const getStore = () => (dispatch, getState) => getState();

export const uploadStore = state => ({
  type: UPLOAD_STORE,
  state
});
