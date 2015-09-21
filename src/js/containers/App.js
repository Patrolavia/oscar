import React, { Component, PropTypes, cloneElement } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-react-router';

import Header from 'containers/Header';
import Toolbar from 'components/Toolbar';
import Toc from 'components/Toc';
import LoadingDots from 'components/LoadingDots';

class App extends Component {
  render() {
    const { children, location: { pathname: key} } = this.props;
    return (
      <div>
        <div className="container">
          <div className="aside">
            <Toolbar />
            <Toc />
          </div>
          <div className="main">
            <Header />
            <div className="content">
              <div className="padContent" ref="padContent">
                { children }
              </div>
            </div>
          </div>
        </div>
        <footer>Copyright Ⓒ 2015 Patrolavia Studio</footer>
      </div>
    );
  }
}


// <EnterAnimation>
//   { cloneElement(children || <div/>, {key: key}) }
// </EnterAnimation>

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
