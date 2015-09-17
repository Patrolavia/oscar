import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default class Toc extends Component {
  render() {
    return (
      <div className="toc" ref="tocWrapper">
        <div className="toc-list">
          <a className="toc-listItem tier1" href="/">Heading tier1</a>
          <a className="toc-listItem tier2" href="/">Heading tier2</a>
          <a className="toc-listItem tier3" href="/">Heading tier3</a>
        </div>
      </div>
    );
  }
}
