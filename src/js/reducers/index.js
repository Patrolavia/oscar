import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';

import auth from './auth';
import editor from './editor';
import pad from './pad';
import pads from './pads';
import pageTitle from './pageTitle';
import users from './users';

const rootReducer = combineReducers({
  router,
  auth,
  editor,
  pad,
  pads,
  pageTitle,
  users
});

export default rootReducer;
