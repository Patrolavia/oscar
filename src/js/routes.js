import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Pads from './containers/Pads';
import Pad from './containers/Pad';

export default (
  <Route component={App}>
    <Route path="/" component={Pads} />
    <Route path="/show" component={Pad} />
  </Route>
);
