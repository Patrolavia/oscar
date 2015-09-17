import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Auth from 'components/Auth';

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <h1>
          PadList
        </h1>
        <Auth />
      </div>
    );
  }
}
