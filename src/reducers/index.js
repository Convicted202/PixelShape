function tools (state = {tool: 'brush'}, action) {
  switch (action.type) {

    case 'SET_TOOL':
      return Object.assign({}, state, {
        tool: action.tool
      });

    default:
      return Object.assign({}, state);
  }
}

function userPalette (state = [], action) {
  switch (action.type) {
    case 'ADD_COLOR':
      return [
        ...state,
        {color: action.color}
      ];
    case 'GET_USER_COLORS':
      return state;
    default:
      return state;
  }
}

const reducers = {
  tools,
  userPalette
}

export default reducers;
