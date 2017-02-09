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
      return { ...state, tool: action.tool };
    case SET_COLOR:
      return { ...state, color: action.color };
    case SET_SIZE:
      return { ...state, size: action.size };
    default:
      return state;
  }
}

export default tools;
