export const SET_TOOL = 'SET_TOOL';
export const SET_CURRENT_COLOR = 'SET_CURRENT_COLOR';

export const setTool = tool => ({
  type: SET_TOOL,
  tool
});

export const setColor = color => ({
  type: SET_CURRENT_COLOR,
  color
});
