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
      return Object.assign({}, state, { colors: userColors });
    case SET_TEMP_COLOR:
      return Object.assign({}, state, { tempColor: action.color });
    case RESET_USER_COLORS:
      return Object.assign({}, initialState);
    default:
      return state;
  }
}

export default userPalette;
