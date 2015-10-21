import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { clone } from 'lodash';
import { searchPad, searchCancel, searchOwn, searchAll } from 'actions';
import classNames from 'classnames';
import gsap from 'gsap';

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
    }
    this.state = this.defaultState;
  }

  componentDidMount() {
    this.checkRouterType(this.props.routerState);
  }

  componentWillReceiveProps(nextProps) {
    this.checkRouterType(nextProps.routerState);
  }

  checkRouterType(routerState) {
    const isCreatePage = routerState.location.pathname.match(/create/);
    const ret = {};
    ret['createModeActive'] = (isCreatePage) ? true : false;
    this.setState(ret);
  }

  onClickHomeHandler() {
    this.context.history.pushState(null, '/');
  }

  onClickToolbarButton(formType) {
    let ret = clone(this.defaultState);
    if (formType.match(/create/)) {
      if (! this.state.createModeActive) { this.context.history.pushState(null, '/create') };
    } else {
      ret[formType] = ! this.state[formType];
    }

    if (this.props.routerState.location.pathname.match(/create/)) {
      ret['createModeActive'] = true;
    }
    this.setState(ret);
  }

  render() {
    const { createModeActive, searchModeActive } = this.state;
    const { isLogged, searchPad, searchCancel, searchOwn, searchAll, usersState, padsState } = this.props;
    return (
      <div className="toolbar">
        <div className="toolbar-action">
          <i className={classNames('icon-plus', {'is-active': createModeActive})} onClick={this.onClickToolbarButton.bind(this, 'createModeActive')}></i>
          <i className={classNames('icon-search', {'is-active': searchModeActive})} onClick={this.onClickToolbarButton.bind(this, 'searchModeActive')}></i>
        </div>
        <i className="icon-home" onClick={this.onClickHomeHandler.bind(this)}></i>
        <ToolbarSearchForm
          isActive={ searchModeActive }
          isLogged={ isLogged }
          searchPad={ searchPad }
          searchCancel={ searchCancel }
          searchOwn={ searchOwn }
          searchAll={ searchAll }
          usersState={ usersState }
          searchParams={ padsState.searchParams }
          toggleState={ this.onClickToolbarButton.bind(this) } />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    routerState: state.router,
    usersState: state.users,
    padsState: state.pads,
    isLogged: state.auth.result
  }
}

export default connect(
  mapStateToProps,
  { searchPad, searchCancel, searchOwn, searchAll }
)(Toolbar);
