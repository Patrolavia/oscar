import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchMe } from 'actions';

import Auth from 'components/Auth';

export default class Header extends Component {
  componentDidMount() {
    this.props.fetchMe();
  }

  render() {
    const { title, authResult, authData } = this.props;
    return (
      <div className="header">
        <h1>
          <span>{ title }</span>
        </h1>
        <Auth result={authResult} data={authData}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { title } = state.pageTitle;
  const { result: authResult, data: authData } = state.me;
  return {
    title: title,
    authResult: authResult,
    authData: authData
  };
}

export default connect(
  mapStateToProps,
  { fetchMe }
)(Header);
