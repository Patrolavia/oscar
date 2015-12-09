import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import routes from '../routes';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import { isDevEnv } from 'utils/config';

let createHistory, composeConfig;

if (isDevEnv()) {
  createHistory = require('history/lib/createHashHistory');
  const logger = createLogger({
    // predicate: (getState, action) => action.type !== AUTH_REMOVE_TOKEN,   // log all actions except AUTH_REMOVE_TOKEN
    level: 'info',
    collapsed: true
  });
  composeConfig = [
    applyMiddleware(thunk),
    reduxReactRouter({ routes, createHistory }),
    applyMiddleware(logger)
  ]
} else {
  createHistory = require('history/lib/createBrowserHistory');
  composeConfig = [
    applyMiddleware(thunk),
    reduxReactRouter({ routes, createHistory })
  ]
}

const finalCreateStore = compose(
  ...composeConfig
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
