import { combineReducers } from 'redux';

import order from './framesOrder';
import collection from './framesCollection';
import activity from './framesActivity';

const frames = combineReducers({
  order,
  collection,
  activity
});

export default frames;
