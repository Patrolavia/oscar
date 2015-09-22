import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default class Auth extends Component {
  render() {
    return (
      <div className="userInfo">
        <span className="userInfo-name">Guest</span>
        <div className="userInfo-image">
          <div className="userInfo-logout">
            <i className="icon-login"></i>
            <div className="userInfo-logoutOverlay"></div>
          </div>
        </div>
        <div className="userInfo-auth dn" ref="authList">
          <ul>
            <li>Login with Google</li>
          </ul>
        </div>
      </div>
    );
  }
}
