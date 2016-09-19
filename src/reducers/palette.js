import {
  ADD_COLOR,
  SET_TEMP_COLOR
} from 'actions/palette';

function userPalette (state = { tempColor: '', colors: [] }, action) {
  let userColors;

  switch (action.type) {
    case ADD_COLOR:
      userColors = [...state.colors, { color: action.color }];
      return Object.assign({}, state, { colors: userColors });
    case SET_TEMP_COLOR:
      return Object.assign({}, state, { tempColor: action.color });
    default:
      return state;
  }
}

export default userPalette;
