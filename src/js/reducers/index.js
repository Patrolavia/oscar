import { routerStateReducer as router } from 'redux-react-router';
import { combineReducers } from 'redux';

import pad from './pad';
import pads from './pads';
import users from './users';

const rootReducer = combineReducers({
  router,
  pad,
  pads,
  users
});

export default rootReducer;
