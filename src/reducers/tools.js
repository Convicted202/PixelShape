import {
  SET_TOOL,
  SET_COLOR,
  SET_SIZE
} from 'actions/tools';

const initialState = {
  tool: 'Brush',
  color: '#1B2631',
  size: 1
};

function tools (state = initialState, action) {
  switch (action.type) {

    case SET_TOOL:
      return Object.assign({}, state, {
        tool: action.tool
      });

    case SET_COLOR:
      return Object.assign({}, state, {
        color: action.color
      });

    case SET_SIZE:
      return Object.assign({}, state, {
        size: action.size
      });

    default:
      return Object.assign({}, state);
  }
}

export default tools;
