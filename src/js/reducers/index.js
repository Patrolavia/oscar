import { routerStateReducer as router } from 'redux-react-router';
import { combineReducers } from 'redux';
import pads from './pads';

const rootReducer = combineReducers({
  router,
  pads
});

export default rootReducer;
