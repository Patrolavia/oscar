import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { fetchPads, fetchUsers, searchPad } from 'actions';
import { each, findWhere } from 'lodash';
import { fadeIn } from 'untils/animation';
import { indexOf, isEqual, pluck, filter } from 'lodash';
import classNames from 'classnames';

import PadOptions from 'containers/PadOptions';
import LoadingDots from 'components/LoadingDots';
import MsgBox from 'components/MsgBox';

export default class Pads extends Component {

  static contextTypes = {
      history: PropTypes.object
  };

  componentDidMount() {
    this.props.fetchPads();
    this.props.fetchUsers();
  }

  componentWillReceiveProps(nextProps) {
    const { padsState: { isSearching, result: padsFetchResult, searchParams } } = this.props;
    if (!padsFetchResult && nextProps.padsState.result && isSearching) {
      this.props.searchPad(searchParams);
    }
  }

  shouldComponentUpdate(nextProps) {
    return isEqual(this.props.deleteState, nextProps.deleteState);
  }

  componentDidUpdate() {
    const $contentNode = findDOMNode(this.refs.contentWrapper);
    fadeIn($contentNode);
  }

  onClickUser(userName) {
    const matchedUsersId = pluck(filter(this.props.usersData, (data) => {
      var inputed = userName.toLowerCase();
      return ~data.name.toLowerCase().indexOf(inputed);
    }), 'id');
    this.props.searchPad({
      type: 'user',
      inputed: userName,
      usersId: matchedUsersId
    });
  }

  onClickTag(value) {
    this.props.searchPad({
      type: 'tag',
      inputed: value
    });
  }

  onClickPad(padId, e) {
    if (indexOf(e.target.classList, 'padList-tag') < 0) {
      const path = '/show/' + padId;
      this.context.history.pushState(null, path);
    }
  }

  renderTags(tags) {
    const tagRows = [];
    each(tags, (value, index) => {
      tagRows.push(
        <li className="padList-tag" key={ index } onClick={ this.onClickTag.bind(this, value) }>{ value }</li>
      );
    });

    return tagRows;
  }

  renderUser(userId) {
    const { usersData } = this.props;
    const currentUser = findWhere(usersData, {id: userId});
    const ownerName = (currentUser) ? currentUser.name : 'Unknown';
    const ownerPic = (currentUser) ? <img src={currentUser.image} /> : '';

    return (
      <div className="padList-ownerInfo">
        <span className="padList-ownerPic">{ ownerPic }</span>
        <span className="padList-owner" onClick={ this.onClickUser.bind(this, ownerName) }>{ ownerName }</span>
      </div>
    );
  }

  renderPads() {
    const { padsState: { data: padsData, isSearching, isSearchOwn, searchResult }, authState } = this.props;
    const padRows = [];

    let currentData = (isSearching) ? searchResult : padsData;

    if (isSearchOwn) {
      const userId = authState.data.id;
      currentData = filter(currentData, (data) => {
        return data.user === userId;
      });
    }

    each(currentData, (value, key) => {
      const { user: ownerId, id: padId, title, tags } = value;

      const authorityInfo = {
        ownerId: ownerId,
        cooperatorList: value.cooperator
      };

      padRows.push(
        <div className="padList-item" key={ key }>
          <div className="padList-info" onClick={ this.onClickPad.bind(this, padId) }>
            <span className="padList-title">{ title }</span>
            <div className={classNames('padList-tags', {'dn': !tags.length})}>
              <i className="icon-tags"></i>
              <ul>
                { this.renderTags(tags) }
              </ul>
            </div>
          </div>
          <div className="padList-detail">
            { this.renderUser(ownerId) }
            <PadOptions
              isHeaderOption={false}
              padData={value}
              authorityInfo={authorityInfo} />
          </div>
        </div>
      );
    });

    return padRows;
  }

  render() {
    const { isFetching, data: padsData, result: padsFetchResult } = this.props.padsState;
    const listContent = (padsData.length) ? <div className="padList">{ this.renderPads() }</div> : <MsgBox state="noPads" />;
    const msgContent = (isFetching) ? <LoadingDots /> : <MsgBox state={"unknownError"} />;

    return (
      <div ref="contentWrapper">
        { padsFetchResult ? listContent : msgContent }
      </div>
    );
  }
}

Pads.propTypes = {
  usersData: PropTypes.array,
  deleteState: PropTypes.object.isRequired,
  padsState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,

  fetchPads: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  searchPad: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    usersData: state.users.data,
    deleteState: state.del,
    padsState: state.pads,
    authState: state.auth
  };
}

export default connect(
  mapStateToProps,
  { fetchPads, fetchUsers, searchPad }
)(Pads);
