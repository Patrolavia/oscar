import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import 'gsap';

export default class Auth extends Component {
  onMouseEnterHandler() {
    const overlay = findDOMNode(this.refs.overlay);
    TweenLite.to(overlay, 0.3, {opacity: 1, ease: 'Power2.easeOut'});
  }

  onMouseLeaveHandler() {
    const overlay = findDOMNode(this.refs.overlay);
    TweenLite.to(overlay, 0.3, {opacity: 0, ease: 'Power2.easeOut'});
  }

  render() {
    const { result, data: { name, image } } = this.props;
    return (
      <div className="userInfo"
        onMouseEnter={this.onMouseEnterHandler.bind(this)}
        onMouseLeave={this.onMouseLeaveHandler.bind(this)}>
        <span className="userInfo-name">{ name }</span>
        <div className="userInfo-image">
          <div className="userInfo-logout" ref="overlay">
            <i className={classNames({'icon-logout': result, 'icon-login': ! result})}></i>
            <div className="userInfo-logoutOverlay"></div>
          </div>
          { image && <img src={image} /> }
        </div>
        <div className="userInfo-auth dn">
          <ul>
            <li>Login with Google</li>
          </ul>
        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  result: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string
  })
};
