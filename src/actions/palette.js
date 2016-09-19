export const ADD_COLOR = 'ADD_COLOR';
export const SET_TEMP_COLOR = 'SET_TEMP_COLOR';

export const addColor = color => ({
  type: ADD_COLOR,
  color
});

export const setTempColor = color => ({
  type: SET_TEMP_COLOR,
  color
});
