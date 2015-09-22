import React, { Component } from 'react';

export default class LoadingDots extends Component {
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
