import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPad, fetchUser, fetchUsers, fetchPads, editPad, editReset } from 'actions';
import { each, findWhere, union, intersection, assign, isEqual } from 'lodash';
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
    this.state = {
      cooperator: [],
      tags: [],
      isLogged: false,
      isEditMode: false
    }
  }

  componentDidMount() {
    const { fetchPad, editReset, params, location: { pathname } } = this.props;
    this.setState({
      isEditMode: (pathname.match(/edit/)) ? true : false
    })
    fetchPad(params);
    editReset();
  }

  shouldComponentUpdate(nextProps) {
    return ! isEqual(this.props.padData, nextProps.padData)
        || ! isEqual(this.props.users, nextProps.users)
        || ! isEqual(this.props.pads, nextProps.pads);
  }

  componentWillReceiveProps(nextProps) {
    const { isFetching, fetchPad, editReset, location: { pathname } } = this.props;
    const { location: { pathname: nextPathname } } = nextProps;

    if (pathname !== nextPathname) {
      this.setState({
        isEditMode: (nextPathname.match(/edit/)) ? true : false
      })
      fetchPad(nextProps.params);
      editReset();
    }

    const { result, padData, users, edit, auth: { result: isLogged } } = nextProps;
    const data = (edit.requestData) ? assign(this.props.padData, edit.requestData) : padData;

    if (edit.result) {
      const path = '/show/' + padData.id;
      this.context.history.pushState(null, path);
    }

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
    const { editPad, padData: { id: padId, version } } = this.props;
    const titleState = this.refs.EditorTitle.getState();
    const contentState = this.refs.EditorContent.getState();
    const cooperatorState = this.refs.EditorCooperate.getState();
    const tagsState = this.refs.EditorTags.getState();

    const parameter = {
      padid: padId,
      version: version
    }

    if (titleState.isChanged) { parameter['title'] = titleState.title }
    if (contentState.isChanged) { parameter['content'] = contentState.content }
    if (tagsState.isChanged) { parameter['tags'] = tagsState.tags }
    if (cooperatorState.isChanged) { parameter['cooperator'] = cooperatorState.cooperatorId }

    editPad(padId, JSON.stringify(parameter));
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

  getCurrentPadData(isEditMode) {
    const { padData, edit } = this.props;
    let data = {};
    if (edit.requestData) {
      data = assign(padData, edit.requestData)
    } else {
      if (isEditMode) {
        data = padData;
      }
    }
    return data;
  }

  getMessage(...params) {
    const [ isLogged, isAuthorized, fetchResult, isEditMode, isFetching, edit ] = params;
    let message = '';
    switch(true) {
      case ! isLogged:
        message = 'Not logged in.';
        break;
      case ! isAuthorized && fetchResult:
        message = 'Not cooperator.';
        break;
      case (isEditMode && ! fetchResult) && ! isFetching:
        message = 'No such pad.';
        break;
      default:
        message = edit.message || '';
    }
    return message;
  }

  render() {
    const { isLogged, isEditMode } = this.state;
    const { result: fetchResult, isFetching, auth, padData: { user: ownerId, cooperator }, fetchUsers, fetchPads, edit } = this.props;

    const authorityCheck = () => {
      if (! isEditMode) { return true };
      if (auth.result) {
        const userId = auth.data.id;
        return intersection([userId], union([ownerId], cooperator)).length > 0;
      }
      return false;
    }

    const isUneditable = ! isLogged || (isEditMode && ! fetchResult) || ! authorityCheck();
    const isAuthorized = isLogged && ((isEditMode && fetchResult) || ! isEditMode) && authorityCheck();
    const isRequesting = edit.isRequesting;
    const isOwner = (isAuthorized) && ownerId === auth.data.id;
    const errorOccurred = ! isRequesting && edit.requestData && ! edit.result;

    const data = this.getCurrentPadData(isEditMode);
    const message = this.getMessage(isLogged, isAuthorized, fetchResult, isEditMode, isFetching, edit);

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
              authority={ isOwner || ! isEditMode } />
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
    padData: data,
    auth: state.auth,
    users: state.users,
    pads: state.pads,
    edit: state.edit
  };
}

export default connect(
  mapStateToProps,
  { fetchPad, fetchUser, fetchUsers, fetchPads, editPad, editReset }
)(Editor);
