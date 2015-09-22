import React, { Component, PropTypes, cloneElement } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';

import Header from 'containers/Header';
import Toolbar from 'components/Toolbar';
import Toc from 'components/Toc';
import LoadingDots from 'components/LoadingDots';
import { fadeIn } from 'untils/animation';

class App extends Component {
  componentDidUpdate() {
    const $contentNode = findDOMNode(this.refs.contentWrapper);
    fadeIn($contentNode);
  }

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
            <div className="content">
              <div className="padContent" ref="contentWrapper">
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

App.propTypes = {
  // Injected by React Router
  children: PropTypes.node
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(App);
