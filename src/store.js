import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from 'reducers/index';

const logger = createLogger({
  duration: true,
  collapsed: true
});

const middleware = [
  thunk
];

if (ENV === 'develop') middleware.push(logger);

const createStoreWithMiddleware = applyMiddleware(
  ...middleware
)(createStore);

const createAppStore = (state = {}) => createStoreWithMiddleware(rootReducer, state);

export default createAppStore;
