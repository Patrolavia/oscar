import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { fetchPads, fetchUsers } from 'actions';
import { each, findWhere } from 'lodash';
import { fadeIn } from 'untils/animation';

import LoadingDots from 'components/LoadingDots';
import MsgBox from 'components/MsgBox';
import PadOptions from 'components/PadOptions';

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

  onClickPad(padId) {
    const path = '/show/' + padId;
    this.context.history.pushState(null, path);
  }

  renderTags(tags) {
    const tagRows = [];
    each(tags, (value, index) => {
      tagRows.push(
        <li className="padList-tag" key={ index }>{ value }</li>
      )
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
        <span className="padList-owner">{ ownerName }</span>
      </div>
    )
  }

  renderPads() {
    const { padsData, authState } = this.props;
    const padRows = [];

    each(padsData, (value, key) => {
      const { user: ownerId, id: padId, title, tags } = value;

      const authorityInfo = {
        ownerId: ownerId,
        cooperatorList: value.cooperator
      }

      padRows.push(
        <div className="padList-item" key={ padId } onClick={ this.onClickPad.bind(this, padId) }>
          <span className="padList-title">{ title }</span>
          { tags.length > 0 &&
            <div className="padList-tags">
              <i className="icon-tags"></i>
              <ul>
                { this.renderTags(tags) }
              </ul>
            </div>
          }
          <div className="padList-detail">
            { this.renderUser(ownerId) }
            <PadOptions
              isHeaderOption={false}
              authState={authState}
              authorityInfo={authorityInfo} />
          </div>
        </div>
      );
    });

    return padRows;
  }

  render() {
    const { padsData, isFetching, padsFetchResult } = this.props;

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
  isFetching: PropTypes.bool.isRequired,
  padsFetchResult: PropTypes.bool,
  padsFetchMessage: PropTypes.string,
  padsData: PropTypes.array,
  usersData: PropTypes.array,

  fetchPads: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    result: padsFetchResult,
    message: padsFetchMessage,
    data: padsData,
    isFetching
  } = state.pads;

  return {
    isFetching: isFetching,
    padsFetchResult: padsFetchResult,
    padsFetchMessage: padsFetchMessage,
    padsData: padsData,
    usersData: state.users.data,
    authState: state.auth
  };
}

export default connect(
  mapStateToProps,
  { fetchPads, fetchUsers }
)(Pads);
