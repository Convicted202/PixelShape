import {
  SET_IMAGE_SIZE,
  SET_SURFACE_CONSTRAINTS,
  TOGGLE_RESET_PALETTE,
  TOGGLE_GRID,
  TOGGLE_STRETCH,
  SET_EXPAND_ANCHOR,
  TOGGLE_INCLUDE_GIF,
  TOGGLE_INCLUDE_SPRITESHEET,
  TOGGLE_INCLUDE_PROJECT,
  TOGGLE_INCLUDE_PALETTE
} from '../actions/application';

import { uuid } from '../utils/uuid';

// TODO: move this to defaults
const defaultConsts = {
  margins: {
    vertical: 120,
    horizontal: 300
  }
};

const initialState = {
  projectGuid: uuid(),
  size: {
    width: 32,
    height: 32
  },
  pixelSize: 20,
  optimalPixelSize: 20,
  surfaceConstraints: {
    width: 2000,
    height: 2000
  },
  resetPalette: false,
  grid: false,
  stretch: false,
  anchor: 'oo',
  downloadOptions: {
    includeGif: true,
    includeSpritesheet: true,
    includeProject: true,
    includePalette: true
  }
};

function getActualConstraints (width, height) {
  return {
    width: width - defaultConsts.margins.horizontal,
    height: height - defaultConsts.margins.vertical
  };
}

function application (state = initialState, action) {
  let constraints = {},
      pixelSize = 0,
      downloadOptions;

  switch (action.type) {
    case SET_IMAGE_SIZE:
      pixelSize = state.optimalPixelSize;
      constraints = getActualConstraints(state.surfaceConstraints.width, state.surfaceConstraints.height);

      if (action.width * pixelSize > constraints.width) pixelSize = constraints.width / action.width;
      if (action.height * pixelSize > constraints.height) pixelSize = constraints.height / action.height;

      pixelSize |= 0;

      return {
        ...state,
        pixelSize,
        size: {
          width: action.width,
          height: action.height
        }
      };
    case SET_SURFACE_CONSTRAINTS:
      pixelSize = state.optimalPixelSize;
      constraints = getActualConstraints(action.width, action.height);

      if (state.size.width * pixelSize > constraints.width) pixelSize = constraints.width / state.size.width;
      if (state.size.height * pixelSize > constraints.height) pixelSize = constraints.height / state.size.height;

      pixelSize |= 0;

      return {
        ...state,
        pixelSize,
        surfaceConstraints: {
          width: action.width,
          height: action.height
        }
      };
    case TOGGLE_RESET_PALETTE:
      return { ...state, resetPalette: !state.resetPalette };
    case TOGGLE_GRID:
      return { ...state, grid: !state.grid };
    case TOGGLE_STRETCH:
      return { ...state, stretch: !state.stretch };
    case SET_EXPAND_ANCHOR:
      return { ...state, anchor: action.anchor };

    case TOGGLE_INCLUDE_GIF:
      downloadOptions = { ...state.downloadOptions, includeGif: !state.downloadOptions.includeGif };
      return { ...state, downloadOptions };
    case TOGGLE_INCLUDE_SPRITESHEET:
      downloadOptions = { ...state.downloadOptions, includeSpritesheet: !state.downloadOptions.includeSpritesheet };
      return { ...state, downloadOptions };
    case TOGGLE_INCLUDE_PALETTE:
      downloadOptions = { ...state.downloadOptions, includePalette: !state.downloadOptions.includePalette };
      return { ...state, downloadOptions };
    case TOGGLE_INCLUDE_PROJECT:
      downloadOptions = { ...state.downloadOptions, includeProject: !state.downloadOptions.includeProject };
      return { ...state, downloadOptions };
    default:
      return state;
  }
}

export default application;
