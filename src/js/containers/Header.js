import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchMe, fetchPaths } from 'actions';

import Auth from 'components/Auth';
import PadOptions from 'components/PadOptions';

export default class Header extends Component {

  componentDidMount() {
    this.props.fetchMe();
    this.props.fetchPaths();
  }

  render() {
    const { title, router: { location: { pathname } }, padState: { data: { id: padId, user: ownerId, cooperator } }, authState } = this.props;

    let authorityInfo = {
      ownerId: [],
      cooperatorList: []
    }

    let currentTitle;
    switch(true) {
      case pathname === '/':
        currentTitle = 'Padlist';
        break;
      case pathname.match(/create/) !== null:
        currentTitle = 'Create pad';
        break;
      default:
        currentTitle = title;
        authorityInfo['ownerId'] = ownerId;
        authorityInfo['cooperatorList'] = cooperator;
    }

    return (
      <div className="header">
        <h1>
          <span>{ currentTitle }</span>
          <PadOptions isHeaderOption={true}
            padId={padId}
            authState={authState}
            authorityInfo={authorityInfo} />
        </h1>
        <Auth { ...this.props }/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { title } = state.pageTitle;
  return {
    title: title,
    router: state.router,
    authState: state.auth,
    padState: state.pad
  };
}

export default connect(
  mapStateToProps,
  { fetchMe, fetchPaths }
)(Header);
