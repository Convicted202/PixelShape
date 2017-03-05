export function getGifFramesData (state) {
  return state.frames.present.activity.framesGifData;
}

export function getModifiedFramesArray (state) {
  return state.frames.present.order.modifiedFramesArray;
}

export function getFPS (state) {
  return state.frames.present.activity.fps;
}

export function getCurrentFrameUUID (state) {
  return state.frames.present.activity.activeFrame;
}

export function getCurrentFrame (state) {
  const uuid = getCurrentFrameUUID(state);
  return state.frames.present.collection[uuid];
}

export function getAllFrames (state) {
  return state.frames.present.collection;
}

export function getFramesOrder (state) {
  return state.frames.present.order.framesOrderArray;
}

export function getCurrentFrameName (state) {
  return state.frames.present.activity.activeFrame && getCurrentFrame(state).name;
}

export function getFramesAmount (state) {
  return state.frames.present.order.framesOrderArray.length;
}

export function getCurrentFrameIndex (state) {
  return state.frames.present.order.framesOrderArray.indexOf(
    getCurrentFrameUUID(state)
  );
}

export function getPreviousFrameUUID (state) {
  const index = getCurrentFrameIndex(state);

  return index > 0
    ? state.frames.present.order.framesOrderArray[index - 1]
    : state.frames.present.activity.activeFrame;
}

export function getNextFrameUUID (state) {
  const index = getCurrentFrameIndex(state),
        amount = getFramesAmount(state);

  return index < amount - 1
    ? state.frames.present.order.framesOrderArray[index + 1]
    : state.frames.present.activity.activeFrame;
}
