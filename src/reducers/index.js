import { combineReducers } from 'redux';

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
  frames,
  panels,
  application
});

const rootReducer = (state, action) => {
  if (action.type === UPLOAD_STORE)
    state = StateConverter.mergeImportedState(state, action.state);

  return appReducer(state, action);
};

export default rootReducer;
