export const getApplication = state => state.undoables.present.application;

export function getProjectGuid (state) {
  return getApplication(state).projectGuid;
}

export function getResetPaletteState (state) {
  return getApplication(state).resetPalette;
}

export function getGridState (state) {
  return getApplication(state).grid;
}

export function getStretchState (state) {
  return getApplication(state).stretch;
}

export function getCurrentAnchor (state) {
  return getApplication(state).anchor;
}

export function getImageSize (state) {
  return getApplication(state).size;
}

export function getImageSizeWidth (state) {
  return getImageSize(state).width;
}

export function getImageSizeHeight (state) {
  return getImageSize(state).height;
}

export function getPixelSize (state) {
  return getApplication(state).pixelSize;
}

export function getOptimalPixelSize (state) {
  return getApplication(state).optimalPixelSize;
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
  return getApplication(state).downloadOptions.includeSpritesheet;
}

export function getGifDownloadOption (state) {
  return getApplication(state).downloadOptions.includeGif;
}

export function getProjectDownloadOption (state) {
  return getApplication(state).downloadOptions.includeProject;
}

export function getPaletteDownloadOption (state) {
  return getApplication(state).downloadOptions.includePalette;
}
