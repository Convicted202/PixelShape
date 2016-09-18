export const SET_TOOL = 'SET_TOOL';
export const SET_COLOR = 'SET_COLOR';
export const SET_SIZE = 'SET_SIZE'

export const setTool = tool => ({
  type: SET_TOOL,
  tool
});

export const setColor = color => ({
  type: SET_COLOR,
  color
});

export const setSize = size => ({
  type: SET_SIZE,
  size
})
