import {
  SET_IMAGE_SIZE,
  SET_SURFACE_CONSTRAINTS,
  TOGGLE_RESET_PALETTE,
  TOGGLE_GRID,
  TOGGLE_STRETCH,
  SET_EXPAND_ANCHOR
} from 'actions/application';

import { uuid } from 'utils/uuid';

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
  anchor: 'oo'
};

function getActualConstraints (width, height) {
  return {
    width: width - defaultConsts.margins.horizontal,
    height: height - defaultConsts.margins.vertical
  };
}

function application (state = initialState, action) {
  let constraints = {},
      pixelSize = 0;

  switch (action.type) {
    case SET_IMAGE_SIZE:
      pixelSize = state.optimalPixelSize;
      constraints = getActualConstraints(state.surfaceConstraints.width, state.surfaceConstraints.height);

      if (action.width * pixelSize > constraints.width) pixelSize = constraints.width / action.width;
      if (action.height * pixelSize > constraints.height) pixelSize = constraints.height / action.height;

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
    default:
      return state;
  }
}

export default application;
