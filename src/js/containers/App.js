import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-react-router';

import Header from 'containers/Header';
import Toolbar from 'components/Toolbar';
import Toc from 'components/Toc';

class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <div className="container">
          <div className="aside">
            <Toolbar />
            <Toc />
          </div>
          <div className="main">
            <Header />
            {children}
          </div>
        </div>
        <footer>Copyright Ⓒ 2015 Patrolavia Studio</footer>
      </div>
    );
  }
}

App.propTypes = {
  pushState: PropTypes.func.isRequired,
  // Injected by React Router
  children: PropTypes.node
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  pushState
})(App);
