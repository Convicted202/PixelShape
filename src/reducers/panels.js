import {
  TOGGLE_TOOLBAR,
  TOGGLE_SIDEBAR,
  TOGGLE_FRAMEBAR
} from 'actions/panels';

const initialState = {
  toolbar: true,
  sidebar: true,
  framebar: true
};

function panels (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_TOOLBAR:
      return Object.assign({}, state, { toolbar: !state.toolbar });
    case TOGGLE_SIDEBAR:
      return Object.assign({}, state, { sidebar: !state.sidebar });
    case TOGGLE_FRAMEBAR:
      return Object.assign({}, state, { framebar: !state.framebar });
    default:
      return state;
  }
}

export default panels;
