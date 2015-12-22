import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { clone } from 'lodash';
import { searchPad, searchCancel, searchOwn, searchAll } from 'actions';
import classNames from 'classnames';

import ToolbarSearchForm from 'components/ToolbarSearchForm';

class Toolbar extends Component {

  static contextTypes = {
      history: PropTypes.object
  };

  constructor() {
    super();
    this.defaultState = {
      createModeActive: false,
      searchModeActive: false
    };
    this.state = this.defaultState;
  }

  componentDidMount() {
    this.checkRouterType(this.props.routerState);
  }

  componentWillReceiveProps(nextProps) {
    this.checkRouterType(nextProps.routerState);
  }

  onClickHomeHandler() {
    this.context.history.pushState(null, '/');
  }

  onClickToolbarButton(formType) {
    const ret = clone(this.defaultState);
    if (formType.match(/create/)) {
      if (!this.state.createModeActive) { this.context.history.pushState(null, '/create'); }
    } else {
      ret[formType] = !this.state[formType];
    }

    if (this.props.routerState.location.pathname.match(/create/)) {
      ret.createModeActive = true;
    }
    this.setState(ret);
  }

  checkRouterType(routerState) {
    const isCreatePage = routerState.location.pathname.match(/create/);
    const ret = {};
    ret.createModeActive = (isCreatePage) ? true : false;
    this.setState(ret);
  }

  render() {
    const { createModeActive, searchModeActive } = this.state;
    return (
      <div className="toolbar">
        <div className="toolbar-action">
          <i className={classNames('icon-plus', {'is-active': createModeActive})} onClick={this.onClickToolbarButton.bind(this, 'createModeActive')}></i>
          <i className={classNames('icon-search', {'is-active': searchModeActive})} onClick={this.onClickToolbarButton.bind(this, 'searchModeActive')}></i>
        </div>
        <i className="icon-home" onClick={this.onClickHomeHandler.bind(this)}></i>
        <ToolbarSearchForm
          { ...this.props }
          isActive={ searchModeActive }
          searchParams={ this.props.padsState.searchParams }
          toggleState={ this.onClickToolbarButton.bind(this) } />
      </div>
    );
  }
}

Toolbar.propTypes = {
  routerState: PropTypes.object.isRequired,
  usersState: PropTypes.object.isRequired,
  padsState: PropTypes.object.isRequired,
  isLogged: PropTypes.bool.isRequired,

  searchPad: PropTypes.func.isRequired,
  searchCancel: PropTypes.func.isRequired,
  searchOwn: PropTypes.func.isRequired,
  searchAll: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    routerState: state.router,
    usersState: state.users,
    padsState: state.pads,
    isLogged: state.auth.result
  };
}

export default connect(
  mapStateToProps,
  { searchPad, searchCancel, searchOwn, searchAll }
)(Toolbar);
