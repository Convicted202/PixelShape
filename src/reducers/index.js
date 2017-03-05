import { combineReducers } from 'redux';
import undoable, { includeAction, excludeAction } from 'redux-undo';

import {
  SET_CURRENT_FRAME,
  SET_FPS,

  ADD_FRAME,
  MOVE_FRAME_RIGHT,
  MOVE_FRAME_LEFT,
  DUPLICATE_FRAME,
  REMOVE_FRAME,

  UPDATE_FRAME_IMAGE_DATA,
  UPDATE_FRAME_NAME,
  UPDATE_FRAMES_SIZE
} from '../actions/frames';

import { UPLOAD_STORE } from '../actions/application';
import { StateConverter } from '../statemanager/StateConverter';

import tools from './tools';
import userPalette from './palette';
import frames from './frames';
import panels from './panels';
import application from './application';

const appReducer = combineReducers({
  tools,
  userPalette,
  frames: undoable(frames, {
    filter: includeAction([
      SET_CURRENT_FRAME, SET_FPS, ADD_FRAME, UPDATE_FRAME_IMAGE_DATA, MOVE_FRAME_RIGHT,
      MOVE_FRAME_LEFT, DUPLICATE_FRAME, REMOVE_FRAME, UPDATE_FRAME_IMAGE_DATA,
      UPDATE_FRAME_NAME, UPDATE_FRAMES_SIZE
    ])
  }),
  panels,
  application
});

const rootReducer = (state, action) => {
  if (action.type === UPLOAD_STORE)
    state = StateConverter.mergeImportedState(state, action.state);

  return appReducer(state, action);
};

export default rootReducer;
