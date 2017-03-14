export const getFrames = state => state.undoables.present.frames;

export function getGifFramesData (state) {
  return getFrames(state).activity.framesGifData;
}

export function getModifiedFramesArray (state) {
  return getFrames(state).order.modifiedFramesArray;
}

export function getFPS (state) {
  return getFrames(state).activity.fps;
}

export function getCurrentFrameUUID (state) {
  return getFrames(state).activity.activeFrame;
}

export function getCurrentFrame (state) {
  const uuid = getCurrentFrameUUID(state);
  return getFrames(state).collection[uuid];
}

export function getAllFrames (state) {
  return getFrames(state).collection;
}

export function getFramesOrder (state) {
  return getFrames(state).order.framesOrderArray;
}

export function getCurrentFrameName (state) {
  return getFrames(state).activity.activeFrame && getCurrentFrame(state).name;
}

export function getFramesAmount (state) {
  return getFrames(state).order.framesOrderArray.length;
}

export function getCurrentFrameIndex (state) {
  return getFrames(state).order.framesOrderArray.indexOf(
    getCurrentFrameUUID(state)
  );
}

export function getPreviousFrameUUID (state) {
  const index = getCurrentFrameIndex(state);

  return index > 0
    ? getFrames(state).order.framesOrderArray[index - 1]
    : getFrames(state).activity.activeFrame;
}

export function getNextFrameUUID (state) {
  const index = getCurrentFrameIndex(state),
        amount = getFramesAmount(state);

  return index < amount - 1
    ? getFrames(state).order.framesOrderArray[index + 1]
    : getFrames(state).activity.activeFrame;
}
