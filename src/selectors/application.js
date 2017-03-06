export function getProjectGuid (state) {
  return state.application.present.projectGuid;
}

export function getResetPaletteState (state) {
  return state.application.present.resetPalette;
}

export function getGridState (state) {
  return state.application.present.grid;
}

export function getStretchState (state) {
  return state.application.present.stretch;
}

export function getCurrentAnchor (state) {
  return state.application.present.anchor;
}

export function getImageSize (state) {
  return state.application.present.size;
}

export function getImageSizeWidth (state) {
  return getImageSize(state).width;
}

export function getImageSizeHeight (state) {
  return getImageSize(state).height;
}

export function getPixelSize (state) {
  return state.application.present.pixelSize;
}

export function getOptimalPixelSize (state) {
  return state.application.present.optimalPixelSize;
}

export function getSurfaceWidth (state) {
  return getImageSizeWidth(state) * getPixelSize(state);
}

export function getSurfaceHeight (state) {
  return getImageSizeHeight(state) * getPixelSize(state);
}

export function getUnscaledSurfaceWidth (state) {
  return getImageSizeHeight(state) * getOptimalPixelSize(state);
}

export function getUnscaledSurfaceHeight (state) {
  return getImageSizeHeight(state) * getOptimalPixelSize(state);
}

export function getSpritesheetDownloadOption (state) {
  return state.application.present.downloadOptions.includeSpritesheet;
}

export function getGifDownloadOption (state) {
  return state.application.present.downloadOptions.includeGif;
}

export function getProjectDownloadOption (state) {
  return state.application.present.downloadOptions.includeProject;
}

export function getPaletteDownloadOption (state) {
  return state.application.present.downloadOptions.includePalette;
}
