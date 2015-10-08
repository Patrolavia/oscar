import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchMe, fetchPaths } from 'actions';

import Auth from 'components/Auth';

export default class Header extends Component {

  componentDidMount() {
    this.props.fetchMe();
    this.props.fetchPaths();
  }

  render() {
    const { title, router: { location: { pathname } } } = this.props;

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
    }

    return (
      <div className="header">
        <h1>
          <span>{ currentTitle }</span>
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
    auth: state.auth,
    router: state.router
  };
}

export default connect(
  mapStateToProps,
  { fetchMe, fetchPaths }
)(Header);
