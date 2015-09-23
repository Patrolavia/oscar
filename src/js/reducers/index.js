import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';

import pad from './pad';
import pads from './pads';
import users from './users';
import pageTitle from './pageTitle';
import me from './me';

const rootReducer = combineReducers({
  router,
  pad,
  pads,
  users,
  pageTitle,
  me
});

export default rootReducer;
