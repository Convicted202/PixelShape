import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';

import {
  SET_CURRENT_FRAME,
  SET_FPS,

  ADD_FRAME,
  MOVE_FRAME_RIGHT,
  MOVE_FRAME_LEFT,
  DUPLICATE_FRAME,
  REMOVE_FRAME,

  UPDATE_FRAME_IMAGE_DATA,
  UPDATE_FRAME_NAME
} from '../actions/frames';

import {
  SET_SURFACE_CONSTRAINTS,
  SET_IMAGE_SIZE
} from '../actions/application';

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
  panels,

  undoables: undoable(combineReducers({
    frames,
    application
  }), {
    filter: includeAction([
      ...[
        SET_CURRENT_FRAME, SET_FPS, ADD_FRAME, UPDATE_FRAME_IMAGE_DATA, MOVE_FRAME_RIGHT,
        MOVE_FRAME_LEFT, DUPLICATE_FRAME, REMOVE_FRAME, UPDATE_FRAME_IMAGE_DATA, UPDATE_FRAME_NAME
      ],
      ...[
        SET_IMAGE_SIZE, SET_SURFACE_CONSTRAINTS
      ]
    ]),
    // IMPORTANT NOTE: this was done with consideration that SET_SURFACE_CONSTRAINTS
    // is fired as the very first action, so do not track initial state before it is fired
    ignoreInitialState: true
  })
});

const rootReducer = (state, action) => {
  if (action.type === UPLOAD_STORE)
    state = StateConverter.mergeImportedState(state, action.state);

  return appReducer(state, action);
};

export default rootReducer;
