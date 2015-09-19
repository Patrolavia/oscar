import { routerStateReducer as router } from 'redux-react-router';
import { combineReducers } from 'redux';

import pad from './pad';
import pads from './pads';
import users from './users';
import process from './process';

const rootReducer = combineReducers({
  router,
  pad,
  pads,
  users,
  process
});

export default rootReducer;
