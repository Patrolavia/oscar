require('../index.jade');
require('../css/application.sass');

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-react-router';
import configureStore from 'store/configureStore';

const store = configureStore();

render(
  <Provider store={store}>
    <ReduxRouter />
  </Provider>,
  document.getElementById('app')
);
