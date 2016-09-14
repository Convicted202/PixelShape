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

const reducers = {
  tools
}

export default reducers;
