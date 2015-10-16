import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPad, fetchUser, fetchUsers, fetchPads, editPad, createPad, resetEditState, resetPadState } from 'actions';
import { each, findWhere, union, intersection, assign, size, isEqual } from 'lodash';
import classNames from 'classnames';

import EditorTitle from 'components/EditorTitle';
import EditorContent from 'components/EditorContent';
import EditorCooperate from 'components/EditorCooperate';
import EditorTags from 'components/EditorTags';

export default class Editor extends Component {

  static contextTypes = {
      history: PropTypes.object
  };

  constructor() {
    super();
    this.state =  {
      cooperator: [],
      tags: []
    };
    this.isEditMode = false;
    this.isLogged = false;
    this.isRequesting = false;
  }

  fetchCurrentPad(props) {
    const { location: { pathname }, params } = props;
    const { fetchPad, resetEditState, resetPadState } = this.props;
    resetPadState();
    resetEditState();
    if (pathname.match(/edit/)) {
      fetchPad(params);
    }
    this.isEditMode = (pathname.match(/edit/)) ? true : false
  }

  componentDidMount() {
    this.fetchCurrentPad(this.props);
  }

  componentWillUnmount() {
    this.isRequesting = false;
  }

  shouldComponentUpdate(nextProps) {
    return isEqual(this.props.deleteState, nextProps.deleteState);
  }

  componentWillReceiveProps(nextProps) {
    const { isFetching, location: { pathname } } = this.props;
    const { location: { pathname: nextPathname }, params } = nextProps;
    this.isEditMode = nextPathname.match(/edit/);

    // 網址切換時
    if (pathname !== nextPathname) {
      this.fetchCurrentPad(nextProps);
    }

    const { fetchPadResult, padData, usersState, editorState, authState: { result: isLogged } } = nextProps;
    const data = this.getCurrentPadData(nextProps, this.isEditMode);

    // 送出結果成功，前往 pad
    if (editorState.result && this.isRequesting) {
      const padId = (this.isEditMode) ? padData.id : editorState.data.id;
      const path = '/show/' + padId;
      this.context.history.pushState(null, path);
    }

    const { fetchUser } = this.props;
    const cooperatorList = [];
    const fetchQueue = [];

    const fetchingCooperator = (data.cooperator) ? data.cooperator.length !== this.state.cooperator.length : false;
    const isStillFetching = fetchPadResult && fetchingCooperator;
    const noCooperator = fetchPadResult && data.cooperator.length === 0;
    const noSuchPad = data.id === undefined;

    // 如果仍在 fetching user （防止 queue 重複堆疊），或根本沒有 cooperator，或根本沒有這個 Pad
    if (isStillFetching || noCooperator || noSuchPad) {
      const { cooperator, tags } = data;
      each(cooperator, (value) => {
        const currentUser = findWhere(usersState.data, { 'id': value });
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
        tags: (tags) ? tags : []
      })
    }

    this.isLogged = isLogged;
  }

  onClickSubmit() {
    const { editPad, padData: { id: padId, version }, createPad } = this.props;
    const titleState = this.refs.EditorTitle.getState();
    const contentState = this.refs.EditorContent.getState();
    const cooperatorState = this.refs.EditorCooperate.getState();
    const tagsState = this.refs.EditorTags.getState();

    let parameter = {}
    if (this.isEditMode) {
      parameter = {
        padid: padId,
        version: version
      }
    }

    if (titleState.isChanged || ! titleState.title) {
      parameter['title'] = (titleState.title) ? titleState.title : 'Untitled';
    }
    if (contentState.isChanged || ! contentState.content) {
      parameter['content'] = (contentState.content) ? contentState.content : '';
    }
    if (tagsState.isChanged) { parameter['tags'] = tagsState.tags }
    if (cooperatorState.isChanged) { parameter['cooperator'] = cooperatorState.cooperatorId }

    if (this.isEditMode) {
      editPad(padId, JSON.stringify(parameter));
    } else {
      createPad(JSON.stringify(parameter))
    }

    this.isRequesting = true;
  }

  onClickCancel() {
    const { padData: { id: padId } } = this.props;
    if (padId) {
      const path = '/show/' + padId;
      this.context.history.pushState(null, path);
    } else {
      this.context.history.pushState(null, '/');
    }
  }

  getCurrentPadData(props) {
    const { padData, editorState } = props;
    let data = {
      title: '',
      content: '',
      cooperator: [],
      tags: []
    };

    if (editorState.requestData) {
      data = assign(padData, editorState.requestData)
    } else {
      if (this.isEditMode && size(padData) > 0) {
        data = padData;
      }
    }

    return data;
  }

  getMessage(...params) {
    const [ isAuthorized, fetchResult, isFetching, editorState ] = params;
    let message = '';
    switch(true) {
      case ! this.isLogged:
        message = 'Not logged in.';
        break;
      case ! isAuthorized && fetchResult:
        message = 'Not cooperator.';
        break;
      case (this.isEditMode && ! fetchResult) && ! isFetching:
        message = 'No such pad.';
        break;
      case (editorState.code === 0):
        // Success
        break;
      default:
        message = editorState.message || '';
    }
    return message;
  }

  render() {
    const { fetchPadResult, isFetching, authState, padData: { user: ownerId, cooperator }, fetchUsers, fetchPads, editorState } = this.props;

    const authorityCheck = () => {
      if (! this.isEditMode) { return true };
      if (authState.result) {
        const userId = authState.data.id;
        return intersection([userId], union([ownerId], cooperator)).length > 0;
      }
      return false;
    }

    // 沒有編輯權限 = 沒登入，是編輯模式＆沒有fetch成功，非合法編輯者
    const isUneditable = ! this.isLogged || (this.isEditMode && ! fetchPadResult) || ! authorityCheck();
    const isAuthorized = this.isLogged && ((this.isEditMode && fetchPadResult) || ! this.isEditMode) && authorityCheck();
    const isRequesting = editorState.isRequesting;
    const isOwner = (isAuthorized) && ownerId === authState.data.id;
    const errorOccurred = ! isRequesting && editorState.requestData && ! editorState.result;

    const data = this.getCurrentPadData(this.props);
    const message = this.getMessage(isAuthorized, fetchPadResult, isFetching, editorState);

    return (
      <div className={classNames('editPad', {'is-disable': isUneditable})} ref="editPad">
        <div className="editPad-title">
          <span className="editPad-optionTitle">Pad title</span>
          <EditorTitle
            ref="EditorTitle"
            data={ data }
            { ...this.props }
            authority={ isAuthorized } />
        </div>
        <div className="editPad-content">
          <span className="editPad-optionTitle">Content</span>
          <EditorContent
            ref="EditorContent"
            data={ data }
            { ...this.props }
            authority={ isAuthorized } />
        </div>
        <div className="editPad-options">
          <div className="editPad-cooperates">
            <span className="editPad-optionTitle">Cooperate</span>
            <EditorCooperate
              ref="EditorCooperate"
              data={ data }
              { ...this.props }
              fetchUsers={ fetchUsers }
              cooperator={ this.state.cooperator }
              authority={ isOwner || ! this.isEditMode } />
          </div>
          <div className="editPad-tags">
            <span className="editPad-optionTitle">Tags</span>
            <EditorTags
              ref="EditorTags"
              data={ data }
              { ...this.props }
              fetchPads={ fetchPads }
              tags={ this.state.tags } />
          </div>
          <div className="editPad-submit">
            <a className="button-wb button-larger" disabled={ isUneditable || isRequesting } onClick={this.onClickSubmit.bind(this)}>
              { isRequesting && 'Sending...' || 'Submit' }
            </a>
            <a className="button-wb button-larger cancel"  onClick={this.onClickCancel.bind(this)}>Cancel</a>
          </div>
          <div className={classNames('editPad-errorMsg', {'dn': ! message.length || isRequesting})} ref="errorMsg">
            <span>{ message }</span>
          </div>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  fetchPadResult: PropTypes.bool,
  padData: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  usersState: PropTypes.object.isRequired,
  editorState: PropTypes.object.isRequired,
  padsState: PropTypes.object.isRequired,
  deleteState: PropTypes.object.isRequired,

  fetchPad: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  fetchPads: PropTypes.func.isRequired,
  editPad: PropTypes.func.isRequired,
  createPad: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    isFetching,
    result: fetchPadResult,
    data: padData
  } = state.pad;

  return {
    isFetching: isFetching,
    fetchPadResult: fetchPadResult,
    padData: padData,
    authState: state.auth,
    usersState: state.users,
    editorState: state.editor,
    padsState: state.pads,
    deleteState: state.del
  };
}

export default connect(
  mapStateToProps,
  { fetchPad, fetchUser, fetchUsers, fetchPads, editPad, createPad, resetEditState, resetPadState }
)(Editor);
