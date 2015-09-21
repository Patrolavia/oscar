import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import 'gsap';

export default class LoadingDots extends Component {
  componentDidMount() {
    // TODO
    const $contentNode = findDOMNode(this);

    if ($contentNode) {
      TweenLite.fromTo(
        $contentNode, 0.8,
        {opacity: 0, ease: "Power1.easeOut"},
        {opacity: 1}
      );
    };
  }

  render() {
    return (
      <div className="loading">
        <div className="loading-dot loading-0"></div>
        <div className="loading-dot loading-1"></div>
        <div className="loading-dot loading-2"></div>
      </div>
    );
  }
}
