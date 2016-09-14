import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';

import reducers from 'reducers/index';

const logger = createLogger({
  duration: true,
  collapsed: true
});

const createStoreWithMiddleware = applyMiddleware(
  logger
)(createStore);

const reducer = combineReducers(
  reducers
);

const createAppStore = (state = {}) =>
  createStoreWithMiddleware(reducer, state);

export default createAppStore;
