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

export function getFramesAmount (state) {
  return state.frames.order.framesOrderArray.length;
}

export function getCurrentFrameIndex (state) {
  return state.frames.order.framesOrderArray.indexOf(state.frames.activity.activeFrame);
}

export function getPreviousFrameUUID (state) {
  const index = getCurrentFrameIndex(state);

  return index > 0
    ? state.frames.order.framesOrderArray[index - 1]
    : state.frames.activity.activeFrame;
}

export function getNextFrameUUID (state) {
  const index = getCurrentFrameIndex(state),
        amount = getFramesAmount(state);

  return index < amount - 1
    ? state.frames.order.framesOrderArray[index + 1]
    : state.frames.activity.activeFrame;
}
