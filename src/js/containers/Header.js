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
    const { title } = this.props;
    return (
      <div className="header">
        <h1>
          <span>{ title }</span>
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
    authState: state.auth
  };
}

export default connect(
  mapStateToProps,
  { fetchMe, fetchPaths }
)(Header);
