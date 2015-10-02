import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { fetchPad, fetchUser, fetchUsers, fetchPads, editPad } from 'actions';
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

  onClickSubmit() {
    const { editPad, data: { id: padId, version } } = this.props;
    const titleState = this.refs.EditorTitle.getState();
    const contentState = this.refs.EditorContent.getState();
    const cooperator = this.refs.EditorCooperate.getCooperator();
    const tags = this.refs.EditorTags.getTags();

    const parameter = {
      padid: padId,
      version: version
    }

    if (contentState.isChanged) { parameter['content'] = contentState.content }

    console.log(parameter);

    editPad(padId, JSON.stringify({'test': 123}));
  }

  render() {
    const { isLogged } = this.state;
    const { result: fetchResult, auth, data: { user: ownerId, cooperator }, fetchUsers, fetchPads } = this.props;
    const authorityCheck = () => {
      if (auth.result) {
        const userId = auth.data.id;
        return intersection([userId], union([ownerId], cooperator)).length > 0;
      }
      return false;
    }

    const isUneditable = ! isLogged || ! fetchResult || ! authorityCheck();
    const isAuthorized = isLogged && fetchResult && authorityCheck();

    return (
      <div className={classNames('editPad', {'is-disable': isUneditable})} ref="editPad">
        <div className="editPad-title">
          <span className="editPad-optionTitle">Pad title</span>
          <EditorTitle
            ref="EditorTitle"
            { ...this.props }
            authority={ isAuthorized }/>
        </div>
        <div className="editPad-content">
          <span className="editPad-optionTitle">Content</span>
          <EditorContent
            ref="EditorContent"
            { ...this.props }
            authority={ isAuthorized } />
        </div>
        <div className="editPad-options">
          <div className="editPad-cooperates">
            <span className="editPad-optionTitle">Cooperate</span>
            <EditorCooperate
              ref="EditorCooperate"
              { ...this.props }
              fetchUsers={ fetchUsers }
              cooperator={ this.state.cooperator }
              authority={ isLogged && fetchResult } />
          </div>
          <div className="editPad-tags">
            <span className="editPad-optionTitle">Tags</span>
            <EditorTags
              ref="EditorTags"
              { ...this.props }
              fetchPads={ fetchPads }
              tags={ this.state.tags } />
          </div>
          <div className="editPad-submit">
            <a className="button-wb button-larger" disabled={ isUneditable } onClick={this.onClickSubmit.bind(this)}>Submit</a>
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
  { fetchPad, fetchUser, fetchUsers, fetchPads, editPad }
)(Editor);
