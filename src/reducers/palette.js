import {
  ADD_COLOR,
  GET_USER_COLORS
} from 'actions/palette';

function userPalette (state = [], action) {
  switch (action.type) {
    case ADD_COLOR:
      return [
        ...state,
        {color: action.color}
      ];
    case GET_USER_COLORS:
      return state;
    default:
      return state;
  }
}

export default userPalette;
