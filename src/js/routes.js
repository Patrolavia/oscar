import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Pads from './containers/Pads';
import Pad from './containers/Pad';
import Editor from './containers/Editor';
import NoMatch from './containers/NoMatch';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Pads} />
    <Route path="/show/:pid" component={Pad} />
    <Route path="/edit/:pid" component={Editor} />
    <Route path="*" component={NoMatch}/>
  </Route>
);
