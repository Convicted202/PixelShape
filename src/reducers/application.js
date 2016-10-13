import {
  SET_IMAGE_SIZE,
  SET_PIXEL_SIZE
} from 'actions/application';

const initialState = {
  size: {
    width: 32,
    height: 32
  },
  pixelSize: 20
  // , grid: false
  // , scaleFactor: 1
};

function application (state = initialState, action) {
  switch (action.type) {
    case SET_IMAGE_SIZE:
      return Object.assign({}, state, { size: { width: action.width, height: action.height } });
    case SET_PIXEL_SIZE:
      return Object.assign({}, state, { pixelSize: action.size });
    default:
      return state;
  }
}

export default application;
