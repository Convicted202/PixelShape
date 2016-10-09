export const ADD_COLOR = 'ADD_COLOR';
export const SET_TEMP_COLOR = 'SET_TEMP_COLOR';
export const RESET_USER_COLORS = 'RESET_USER_COLORS';

export const addColor = color => ({
  type: ADD_COLOR,
  color
});

export const setTempColor = color => ({
  type: SET_TEMP_COLOR,
  color
});

export const resetUserColors = () => ({
  type: RESET_USER_COLORS
});
