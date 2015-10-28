import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { fadeIn } from 'untils/animation';
import StickyDiv from 'react-stickydiv';

import Header from 'containers/Header';
import Toolbar from 'containers/Toolbar';
import DeleteConfirm from 'containers/DeleteConfirm';
import Toc from 'containers/Toc';
import FloatToolButton from 'containers/FloatToolButton';
import FloatSearchButton from 'containers/FloatSearchButton';

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
          <DeleteConfirm />
          <div className="aside">
            <Toolbar />
            <StickyDiv>
              <Toc />
            </StickyDiv>
          </div>
          <div className="main">
            <Header />
            <div className="content">
              <div className="padContent" ref="contentWrapper">
                { children }
              </div>
            </div>
          </div>
          <FloatToolButton />
          <FloatSearchButton />
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

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(App);
