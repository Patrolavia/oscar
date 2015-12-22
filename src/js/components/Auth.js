import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { each } from 'lodash';
import classNames from 'classnames';
import 'gsap';

const TweenLite = window.TweenLite;

export default class Auth extends Component {
  static contextTypes = {
      history: PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      isPathsActive: false
    };
  }

  componentDidMount() {
    this.viewboxInit = false;
    document.body.addEventListener('click', this.onClickBodyHandler.bind(this));
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onClickBodyHandler.bind(this));
  }

  onClickBodyHandler() {
    this.setState({
      isPathsActive: false
    });
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
      isPathsActive: !isPathsActive
    });

    // TODO: Logout
    if (this.props.authState.result) {
      this.props.logout();
    }
  }

  onClickLoginPath(path) {
    this.props.login(path);
  }

  eventPreventPropagation(e) {
    e.stopPropagation();
  }

  renderPaths() {
    const { paths } = this.props.authState;
    const pathRows = [];
    each(paths, (value, index) => {
      const authUrl = '/auth/' + value;
      pathRows.push(
        <li key={ index }>
          <a href={ authUrl } onClick={this.onClickLoginPath.bind(this.value)}>Login with { value }</a>
        </li>
      );
    });

    return pathRows;
  }

  render() {
    const { result, data: { name, image }, paths } = this.props.authState;

    return (
      <div className="userInfo"
        onMouseEnter={this.onMouseEnterHandler.bind(this)}
        onMouseLeave={this.onMouseLeaveHandler.bind(this)}
        onClick={this.onClickHandler.bind(this)}>
        <span className="userInfo-name">{ name }</span>
        <div className="userInfo-image">
          <div className="userInfo-logout" ref="overlay">
            <i className={classNames({'icon-logout': result, 'icon-login': !result})}></i>
            <div className="userInfo-logoutOverlay"></div>
          </div>
          { image && <img src={image} /> }
        </div>
        { !result && paths &&
          <div className={classNames('userInfo-auth', {'dn': !this.state.isPathsActive})}
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
  }),
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};
