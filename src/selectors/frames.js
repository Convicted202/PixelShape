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
