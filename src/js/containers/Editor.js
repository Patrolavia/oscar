import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { fetchPad, fetchUser } from 'actions';
import { each, findWhere, union, intersection } from 'lodash';
import classNames from 'classnames';

import EditorTitle from 'components/EditorTitle';
import EditorContent from 'components/EditorContent';
import EditorCooperate from 'components/EditorCooperate';
import EditorTags from 'components/EditorTags';

export default class Editor extends Component {

  constructor() {
    super();
    this.state = {
      cooperator: [],
      tags: [],
      isLogged: false
    }
  }

  componentDidMount() {
    const { fetchPad, fetchUser, params } = this.props;
    fetchPad(params);
  }

  componentWillReceiveProps(nextProps) {
    const { isFetching, fetchPad, location: { pathname }, auth: { result: isLogged } } = this.props;
    if (pathname !== nextProps.location.pathname) {
      fetchPad(nextProps.params);
    }

    const { result, data, users } = nextProps;
    const { fetchUser } = this.props;
    const cooperatorList = [];
    const fetchQueue = [];

    const fetchingCooperator = (data.cooperator) ? data.cooperator.length !== this.state.cooperator.length : false;
    const isStillFetching = result && fetchingCooperator;
    const noCooperator = result && data.cooperator.length === 0;
    const noSuchPad = data.cooperator === undefined;

    if (isStillFetching || noCooperator || noSuchPad) {
      const { cooperator, tags } = data;
      each(cooperator, (value) => {
        const currentUser = findWhere(users.data, { 'id': value });
        if (currentUser) {
          cooperatorList.push(currentUser);
        } else {
          fetchQueue.push(value);
        }
      })

      if (fetchQueue.length) {
        fetchUser(fetchQueue);
      }

      this.setState({
        cooperator: cooperatorList,
        tags: (tags) ? tags : [],
        isLogged: isLogged
      })
    }
  }

  render() {
    const { isLogged } = this.state;
    const { result: fetchResult, auth, data: { user: ownerId, cooperator } } = this.props;

    const hasAuthorized = () => {
      let userId;
      if (auth.result) {
        userId = auth.data.id;
      } else {
        return false;
      }

      return intersection([userId], union([ownerId], cooperator)).length > 0;
    }

    return (
      <div className={classNames('editPad', {'is-disable': ! isLogged || ! fetchResult || ! hasAuthorized()})} ref="editPad">
        <div className="editPad-title">
          <span className="editPad-optionTitle">Pad title</span>
          <EditorTitle ref="EditTitle" { ...this.props } authority={ isLogged && fetchResult && hasAuthorized() }/>
        </div>
        <div className="editPad-content">
          <span className="editPad-optionTitle">Content</span>
          <EditorContent ref="EditContent" { ...this.props } authority={ isLogged && fetchResult && hasAuthorized() } />
        </div>
        <div className="editPad-options">
          <div className="editPad-cooperates">
            <span className="editPad-optionTitle">Cooperate</span>
            <EditorCooperate ref="EditCooperate" { ...this.props } cooperator={this.state.cooperator} authority={ isLogged && fetchResult } />
          </div>
          <div className="editPad-tags">
            <span className="editPad-optionTitle">Tags</span>
            <EditorTags ref="EditTag" { ...this.props } tags={this.state.tags} />
          </div>
          <div className="editPad-submit">
            <a className={classNames('button-wb', 'button-larger', {'is-disable': ! isLogged})}>Submit</a>
            <a className="button-wb button-larger cancel">Cancel</a>
          </div>
          <div className="editPad-errorMsg" ref="errorMsg">
            <span>{ isLogged ? 'Error msg' : 'Not logged in.' }</span>
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
    auth: state.auth,
    users: state.users,
    pads: state.pads
  };
}

export default connect(
  mapStateToProps,
  { fetchPad, fetchUser }
)(Editor);
