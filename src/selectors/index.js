export function getTool(state) {
  return state.tools.tool;
}

export function getToolSettings(state) {
  return state.tools;
}

export function getCurrentColor(state) {
  return state.tools.color;
}

export function getCustomColors(state) {
  return state.userPalette.colors;
}

export function getTempColor(state) {
  return state.userPalette.tempColor;
}
