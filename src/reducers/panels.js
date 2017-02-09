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
      return { ...state, toolbar: !state.toolbar };
    case TOGGLE_SIDEBAR:
      return { ...state, sidebar: !state.sidebar };
    case TOGGLE_FRAMEBAR:
      return { ...state, framebar: !state.framebar };
    default:
      return state;
  }
}

export default panels;
