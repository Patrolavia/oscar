import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Auth from 'components/Auth';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Loading...'
    }
  }

  componentWillUpdate(nextProps) {
    this.state.title = nextProps.title;
  }

  render() {
    return (
      <div className="header">
        <h1>
          <span>{ this.state.title }</span>
        </h1>
        <Auth />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { title } = state.pageTitle;
  return {
    title: title
  };
}

export default connect(
  mapStateToProps
)(Header);
