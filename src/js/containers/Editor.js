import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPad, fetchUser, fetchUsers, fetchPads, editPad, createPad, resetEditState, resetPadState } from 'actions';
import { each, findWhere, union, intersection, size, isEqual } from 'lodash';
import classNames from 'classnames';
import g11n from 'utils/g11n';

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
    this.state = {
      cooperator: [],
      tags: []
    };
    this.isEditMode = false;
    this.isLogged = false;
    this.isRequesting = false;
  }

  componentWillMount() {
    const {authState: { result: isLogged } } = this.props;
    this.isLogged = isLogged;
  }

  componentDidMount() {
    this.fetchCurrentPad(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { location: { pathname } } = this.props;
    const { location: { pathname: nextPathname } } = nextProps;
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
      });

      if (fetchQueue.length) {
        this.props.fetchUser({useridArray: fetchQueue});
      }

      this.setState({
        cooperator: cooperatorList,
        tags: (tags) ? tags : []
      });
    }

    this.isLogged = isLogged;
  }

  shouldComponentUpdate(nextProps) {
    return isEqual(this.props.deleteState, nextProps.deleteState);
  }

  componentWillUnmount() {
    this.isRequesting = false;
    this.props.resetEditState();
  }

  onClickSubmit() {
    const { padData: { id: padId, version } } = this.props;
    const titleState = this.refs.EditorTitle.getState();
    const contentState = this.refs.EditorContent.getState();
    const cooperatorState = this.refs.EditorCooperate.getState();
    const tagsState = this.refs.EditorTags.getState();

    const contents = {
      title: (titleState.title) ? titleState.title : 'Untitled',
      content: (contentState.content) ? contentState.content : '',
      tags: tagsState.tags,
      cooperator: cooperatorState.cooperatorId
    };

    let parameter = {};
    if (this.isEditMode) {
      parameter = {
        padid: padId,
        version: version,
        title: contents.title,
        content: contents.content,
        tags: contents.tags,
        cooperator: contents.cooperator
      };
    }

    if (titleState.isChanged || !titleState.title) { parameter.title = contents.title; }
    if (contentState.isChanged || !contentState.content) { parameter.content = contents.content; }
    if (tagsState.isChanged) { parameter.tags = contents.tags; }
    if (cooperatorState.isChanged) { parameter.cooperator = contents.cooperator; }

    if (this.isEditMode) {
      this.props.editPad({pid: padId, parameter: JSON.stringify(parameter)});
    } else {
      this.props.createPad(JSON.stringify(parameter));
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
      data = JSON.parse(editorState.requestData);
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
    switch (true) {
      case !this.isLogged:
        message = g11n.t('editor.edit')[1];
        break;
      case (this.isEditMode && !fetchResult) && !isFetching:
        message = g11n.t('editor.edit')[2];
        break;
      case !isAuthorized && fetchResult:
        message = g11n.t('editor.edit')[3];
        break;
      case (editorState.data.code === 0):
        // Success
        break;
      default:
        if (editorState.errorStatus) {
          message = g11n.t('error', {':errCode': editorState.errorStatus});
        } else {
          message = g11n.t('editor.edit')[editorState.data.code] || '';
        }
    }
    return message;
  }

  fetchCurrentPad(props) {
    const { location: { pathname }, params } = props;
    this.props.resetPadState();
    this.props.resetEditState();
    if (pathname.match(/edit/)) {
      this.props.fetchPad(params);
    }
    this.isEditMode = (pathname.match(/edit/)) ? true : false;
  }

  render() {
    const { fetchPadResult, isFetching, authState, padData: { user: ownerId, cooperator }, editorState } = this.props;

    const authorityCheck = () => {
      if (!this.isEditMode) { return true; }
      if (authState.result) {
        const userId = authState.data.id;
        return intersection([userId], union([ownerId], cooperator)).length > 0;
      }
      return false;
    };

    // 沒有編輯權限 = 沒登入，是編輯模式＆沒有fetch成功，非合法編輯者
    const isUneditable = !this.isLogged || (this.isEditMode && !fetchPadResult) || !authorityCheck();
    const isAuthorized = this.isLogged && ((this.isEditMode && fetchPadResult) || !this.isEditMode) && authorityCheck();
    const isRequesting = editorState.isRequesting;
    const isOwner = (isAuthorized) && ownerId === authState.data.id;

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
              cooperator={ this.state.cooperator }
              authority={ isOwner || !this.isEditMode } />
          </div>
          <div className="editPad-tags">
            <span className="editPad-optionTitle">Tags</span>
            <EditorTags
              ref="EditorTags"
              data={ data }
              { ...this.props }
              tags={ this.state.tags } />
          </div>
          <div className="editPad-submit">
            <a className="button-wb button-larger" disabled={ isUneditable || isRequesting } onClick={this.onClickSubmit.bind(this)}>
              { isRequesting && 'Sending...' || 'Submit' }
            </a>
            <a className="button-wb button-larger cancel" onClick={this.onClickCancel.bind(this)}>Cancel</a>
          </div>
          <div className={classNames('editPad-errorMsg', {'dn': !message.length || isRequesting})} ref="errorMsg">
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
  location: PropTypes.object.isRequired,
  padData: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  usersState: PropTypes.object.isRequired,
  editorState: PropTypes.object.isRequired,
  padsState: PropTypes.object.isRequired,
  deleteState: PropTypes.object.isRequired,

  fetchPad: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  fetchPads: PropTypes.func.isRequired,
  editPad: PropTypes.func.isRequired,
  createPad: PropTypes.func.isRequired,
  resetPadState: PropTypes.func.isRequired,
  resetEditState: PropTypes.func.isRequired
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
