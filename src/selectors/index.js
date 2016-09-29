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

export function getFPS(state) {
  return state.frames.fps;
}

export function getCurrentFrameUUID(state) {
  return state.frames.currentFrame;
}

export function getCurrentFrame(state) {
  const frames = state.frames;
  return frames.framesCollection[frames.currentFrame];
}

export function getAllFrames(state) {
  return state.frames.framesCollection;
}

export function getCurrentFrameName(state) {
  const frames = state.frames;
  return frames.currentFrame && frames.framesCollection[frames.currentFrame].name;
}
