import {
  SET_TOOL,
  SET_CURRENT_COLOR
} from 'actions/tools';

const initialState = {
  tool: 'brush',
  color: '#1B2631',
  stroke: 10
}

function tools (state = initialState, action) {
  switch (action.type) {

    case SET_TOOL:
      return Object.assign({}, state, {
        tool: action.tool
      });

    case SET_CURRENT_COLOR:
      return Object.assign({}, state, {
        color: action.color
      });

    default:
      return Object.assign({}, state);
  }
}

export default tools;
