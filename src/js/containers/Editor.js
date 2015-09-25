import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { fetchPad, fetchUser } from 'actions';
import { each, findWhere } from 'lodash';

import EditorTitle from 'components/EditorTitle';
import EditorContent from 'components/EditorContent';
import EditorCooperate from 'components/EditorCooperate';

export default class Editor extends Component {

  constructor() {
    super();
    this.state = {
      cooperator: []
    }
  }

  componentDidMount() {
    const { fetchPad, params } = this.props;
    fetchPad(params);
  }FETCH_USER_SUCCESS

  componentWillReceiveProps(nextProps) {
    const { isFetching, fetchPad, location: { pathname } } = this.props;
    if (pathname !== nextProps.location.pathname) {
      fetchPad(nextProps.params);
    }

    const { result, data, users } = nextProps;
    const { fetchUser } = this.props;
    const cooperatorList = [];

    if (result && data.cooperator.length !== this.state.cooperator.length || data.cooperator === undefined) {
      const { cooperator } = data;
      each(cooperator, (value) => {
        const currentUser = findWhere(users.data, { 'id': value });
        if (currentUser) {
          cooperatorList.push(currentUser.name);
        } else {
          fetchUser(value);
        }
      })
      this.setState({
        cooperator: cooperatorList
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { cooperator: nextPropsCooperator } = nextProps.data
    const isFetching = this.props.isFetching !== nextProps.isFetching;
    const usersUpdated = nextProps.users !== this.props.users;
    const getAllCooperators = (! nextPropsCooperator) ? false : nextPropsCooperator.length === nextState.cooperator.length;
    return isFetching || usersUpdated || getAllCooperators;
  }

  render() {
    return (
      <div className="editPad" ref="editPad">
        <div className="editPad-title">
          <span className="editPad-optionTitle">Pad title</span>
          <EditorTitle ref="EditTitle" { ...this.props } authority={ true }/>
        </div>
        <div className="editPad-content">
          <span className="editPad-optionTitle">Content</span>
          <EditorContent ref="EditContent" { ...this.props } authority={ true } />
        </div>
        <div className="editPad-options">
          <div className="editPad-cooperates">
            <span className="editPad-optionTitle">Cooperate</span>
            <EditorCooperate ref="EditCooperate" { ...this.props } cooperator={this.state.cooperator} />
          </div>
          <div className="editPad-tags">
            <span className="editPad-optionTitle">Tags</span>
            <input ref="EditTag" />
          </div>
          <div className="editPad-submit">
            <a className="button-wb button-larger">Submit</a>
            <a className="button-wb button-larger cancel">Cancel</a>
          </div>
          <div className="editPad-errorMsg" ref="errorMsg">
            <span>Error msg</span>
          </div>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  result: PropTypes.bool,
  data: PropTypes.object,
  fetchPad: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    isFetching,
    result,
    data
  } = state.pad;

  return {
    isFetching: isFetching,
    result: result,
    data,
    users: state.users
  };
}

export default connect(
  mapStateToProps,
  { fetchPad, fetchUser }
)(Editor);
