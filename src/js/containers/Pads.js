import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { fetchPads, fetchUsers, searchPad } from 'actions';
import { each, findWhere } from 'lodash';
import { fadeIn } from 'untils/animation';
import { indexOf, isEqual, pluck, filter } from 'lodash';

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

  componentDidUpdate() {
    const $contentNode = findDOMNode(this.refs.contentWrapper);
    fadeIn($contentNode);
  }

  onClickPad(padId, e) {
    if (indexOf(e.target.classList, 'padList-tag') < 0) {
      const path = '/show/' + padId;
      this.context.history.pushState(null, path);
    }
  }

  onClickTag(value) {
    this.props.searchPad({
      type: 'tag',
      inputed: value
    })
  }

  onClickUser(userName) {
    const matchedUsersId = pluck(filter(this.props.usersData, function(data) {
      var inputed = userName.toLowerCase();
      return ~ data.name.toLowerCase().indexOf(inputed);
    }), 'id');
    this.props.searchPad({
      type: 'user',
      inputed: userName,
      usersId: matchedUsersId
    })
  }

  renderTags(tags) {
    const tagRows = [];
    each(tags, (value, index) => {
      tagRows.push(
        <li className="padList-tag" key={ index } onClick={ this.onClickTag.bind(this, value) }>{ value }</li>
      )
    });

    return tagRows;
  }

  componentWillReceiveProps(nextProps) {
    const { padsState: { isSearching, result: padsFetchResult, searchParams }, searchPad, usersData } = this.props;
    if (! padsFetchResult && nextProps.padsState.result && isSearching) {
      searchPad(searchParams);
    }
  }

  shouldComponentUpdate(nextProps) {
    return isEqual(this.props.deleteState, nextProps.deleteState);
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
    )
  }

  renderPads() {
    const { padsState: { data: padsData, isSearching, isSearchOwn, searchResult }, authState } = this.props;
    const padRows = [];

    let currentData = (isSearching) ? searchResult : padsData;

    if (isSearchOwn) {
      const userId = authState.data.id;
      currentData = filter(currentData, (data) => {
        return data.user === userId
      })
    }

    each(currentData, (value, key) => {
      const { user: ownerId, id: padId, title, tags } = value;

      const authorityInfo = {
        ownerId: ownerId,
        cooperatorList: value.cooperator
      }

      padRows.push(
        <div className="padList-item" key={ key }>
          <div className="padList-info" onClick={ this.onClickPad.bind(this, padId) }>
            <span className="padList-title">{ title }</span>
            { tags.length > 0 &&
              <div className="padList-tags">
                <i className="icon-tags"></i>
                <ul>
                  { this.renderTags(tags) }
                </ul>
              </div>
            }
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

    return (
      <div ref="contentWrapper">
        { padsFetchResult ?
          padsData.length ? <div className="padList">{ this.renderPads() }</div> : <MsgBox state="noPads" />
        :
          isFetching ? <LoadingDots /> : <MsgBox state={"unknownError"} />
        }
      </div>
    );
  }
}

Pads.propTypes = {
  usersData: PropTypes.array,
  deleteState: PropTypes.object.isRequired,
  fetchPads: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired
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
