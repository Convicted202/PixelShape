export const ADD_COLOR = 'ADD_COLOR';
export const GET_USER_COLORS = 'GET_USER_COLORS';

export const addColor = color => ({
  type: ADD_COLOR,
  color
});

export const getUserColors = () => ({
  type: GET_USER_COLORS
})
