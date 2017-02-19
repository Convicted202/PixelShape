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

export function getSpritesheetDownloadOption (state) {
  return state.application.downloadOptions.includeSpritesheet;
}

export function getGifDownloadOption (state) {
  return state.application.downloadOptions.includeGif;
}

export function getProjectDownloadOption (state) {
  return state.application.downloadOptions.includeProject;
}

export function getPaletteDownloadOption (state) {
  return state.application.downloadOptions.includePalette;
}
