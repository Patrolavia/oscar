import { routerStateReducer as router } from 'redux-react-router';
import { combineReducers } from 'redux';

import pads from './pads';
import users from './users';

const rootReducer = combineReducers({
  router,
  pads,
  users
});

export default rootReducer;
