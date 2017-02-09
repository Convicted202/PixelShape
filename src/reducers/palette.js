import {
  ADD_COLOR,
  SET_TEMP_COLOR,
  RESET_USER_COLORS
} from 'actions/palette';

const initialState = {
  tempColor: '',
  colors: []
};

function userPalette (state = initialState, action) {
  let userColors;

  switch (action.type) {
    case ADD_COLOR:
      userColors = [...state.colors, { color: action.color }];
      return { ...state, colors: userColors };
    case SET_TEMP_COLOR:
      return { ...state, tempColor: action.color };
    case RESET_USER_COLORS:
      return { ...initialState };
    default:
      return state;
  }
}

export default userPalette;
