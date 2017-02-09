export function getProjectGuid (state) {
  return state.application.projectGuid;
}

export function getResetPaletteState (state) {
  return state.application.resetPalette;
}

export function getGridState (state) {
  return state.application.grid;
}

export function getStretchState (state) {
  return state.application.stretch;
}

export function getCurrentAnchor (state) {
  return state.application.anchor;
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

export function getGifFramesData (state) {
  return state.frames.activity.framesGifData;
}

export function getModifiedFramesArray (state) {
  return state.frames.order.modifiedFramesArray;
}

export function getFPS (state) {
  return state.frames.activity.fps;
}

export function getCurrentFrameUUID (state) {
  return state.frames.activity.activeFrame;
}

export function getCurrentFrame (state) {
  const uuid = getCurrentFrameUUID(state);
  return state.frames.collection[uuid];
}

export function getAllFrames (state) {
  return state.frames.collection;
}

export function getFramesOrder (state) {
  return state.frames.order.framesOrderArray;
}

export function getCurrentFrameName (state) {
  return state.frames.activity.activeFrame && getCurrentFrame(state).name;
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
