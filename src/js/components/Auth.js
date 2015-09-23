import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { each } from 'lodash';
import classNames from 'classnames';
import 'gsap';

export default class Auth extends Component {
  constructor() {
    super();
    this.state = {
      isPathsActive: false
    }
  }

  componentDidMount() {
    this.viewboxInit = false;
    document.body.addEventListener('click', this.onClickBodyHandler.bind(this));
  }

  componentWillUnmount () {
    document.body.removeEventListener('click', this.onClickBodyHandler.bind(this));
  }

  onClickBodyHandler(e) {
    this.setState({
      isPathsActive: false
    })
  }

  onMouseEnterHandler() {
    const overlay = findDOMNode(this.refs.overlay);
    TweenLite.to(overlay, 0.3, {opacity: 1, ease: 'Power2.easeOut'});
  }

  onMouseLeaveHandler() {
    const overlay = findDOMNode(this.refs.overlay);
    TweenLite.to(overlay, 0.3, {opacity: 0, ease: 'Power2.easeOut'});
  }

  onClickHandler() {
    const { isPathsActive } = this.state;
    this.setState({
      isPathsActive: ! isPathsActive
    })
  }

  eventPreventPropagation(e) {
    e.preventPropagation;
  }

  renderPaths() {
    const { paths } = this.props.authState;
    const pathRows = [];
    each(paths, (value, index) => {
      const authUrl = '/auth/' + value;
      pathRows.push(
        <li key={ index }>
          <a href={ authUrl }>Login with { value }</a>
        </li>
      )
    });

    return pathRows;
  }

  render() {
    const { result, data: { name, image }, paths } = this.props.authState;
    console.log(result);
    return (
      <div className="userInfo"
        onMouseEnter={this.onMouseEnterHandler.bind(this)}
        onMouseLeave={this.onMouseLeaveHandler.bind(this)}
        onClick={this.onClickHandler.bind(this)}>
        <span className="userInfo-name">{ name }</span>
        <div className="userInfo-image">
          <div className="userInfo-logout" ref="overlay">
            <i className={classNames({'icon-logout': result, 'icon-login': ! result})}></i>
            <div className="userInfo-logoutOverlay"></div>
          </div>
          { image && <img src={image} /> }
        </div>
        { ! result && paths &&
          <div className={classNames('userInfo-auth', {'dn': ! this.state.isPathsActive})}
            onClick={this.eventPreventPropagation}>
            <ul>
              { this.renderPaths() }
            </ul>
          </div>
        }
      </div>
    );
  }
}

Auth.propTypes = {
  authState: PropTypes.shape({
    result: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string
    }),
    paths: PropTypes.array
  })
};
