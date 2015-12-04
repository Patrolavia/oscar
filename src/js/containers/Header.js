import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchMe, fetchPaths, login, logout } from 'actions';
import g11n from 'utils/g11n';

import PadOptions from 'containers/PadOptions';
import Auth from 'components/Auth';

export default class Header extends Component {

  componentDidMount() {
    this.props.fetchMe();
    this.props.fetchPaths();
  }

  render() {
    const { title, routerState: { location: { pathname } }, padState } = this.props;

    const authorityInfo = {
      ownerId: [],
      cooperatorList: []
    };

    let currentTitle;
    switch (true) {
      case pathname === '/':
        currentTitle = g11n.t('pageTitle.padlist');
        break;
      case pathname.match(/create/) !== null:
        currentTitle = g11n.t('pageTitle.create');
        break;
      default:
        currentTitle = title;
        authorityInfo.ownerId = padState.data.user;
        authorityInfo.cooperatorList = padState.data.cooperator;
    }

    return (
      <div className="header">
        <h1>
          <span className="header-heading">{ currentTitle }</span>
          <PadOptions
            isHeaderOption={true}
            padData={padState.data}
            authorityInfo={authorityInfo} />
        </h1>
        <Auth { ...this.props } />
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  routerState: PropTypes.object.isRequired,
  padState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,

  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  fetchMe: PropTypes.func.isRequired,
  fetchPaths: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { title } = state.pageTitle;
  return {
    title: title,
    routerState: state.router,
    padState: state.pad,
    authState: state.auth
  };
}

export default connect(
  mapStateToProps,
  { fetchMe, fetchPaths, login, logout }
)(Header);
