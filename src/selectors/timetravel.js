export function canUndo (state) {
  return state.undoables.past.length > 0;
}

export function canRedo (state) {
  return state.undoables.future.length > 0;
}
