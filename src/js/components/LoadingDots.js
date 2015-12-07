import React, { Component } from 'react';
import Loader from 'halogen/ScaleLoader';

export default class LoadingDot extends Component {
  render() {
    return (
      <div className="LoadingDot">
        <Loader color="#757575" size="10px" />
      </div>
    );
  }
}
