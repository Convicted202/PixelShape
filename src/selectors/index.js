export function getTool (state) {
  return state.tools.tool;
}

export function getToolSettings (state) {
  return state.tools;
}

export function getCurrentColor (state) {
  return state.tools.color;
}

export function getCustomColors (state) {
  return state.userPalette.colors;
}

export function getTempColor (state) {
  return state.userPalette.tempColor;
}

export function getGifFramesArray (state) {
  return state.frames.framesDataArray;
}

export function getFPS (state) {
  return state.frames.fps;
}

export function getCurrentFrameUUID (state) {
  return state.frames.currentFrame;
}

export function getCurrentFrame (state) {
  const frames = state.frames;
  return frames.framesCollection[frames.currentFrame];
}

export function getAllFrames (state) {
  return state.frames.framesCollection;
}

export function getFramesOrder (state) {
  return state.frames.framesOrder;
}

export function getCurrentFrameName (state) {
  const frames = state.frames;
  return frames.currentFrame && frames.framesCollection[frames.currentFrame].name;
}

export function getToolbarVisibility (state) {
  return state.panels.toolbar;
}

export function getSidebarVisibility (state) {
  return state.panels.sidebar;
}

export function getFramebarVisibility (state) {
  return state.panels.framebar;
}

export function getImageSize (state) {
  return state.application.size;
}

export function getPixelSize (state) {
  return state.application.pixelSize;
}

export function getSurfaceWidth (state) {
  return state.application.size.width * state.application.pixelSize;
}

export function getSurfaceHeight (state) {
  return state.application.size.height * state.application.pixelSize;
}

export function getUnscaledSurfaceWidth (state) {
  return state.application.size.width * state.application.optimalPixelSize;
}

export function getUnscaledSurfaceHeight (state) {
  return state.application.size.height * state.application.optimalPixelSize;
}
