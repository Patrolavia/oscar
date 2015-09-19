import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPads, fetchUsers } from 'actions';
import { each } from 'lodash';
import LoadingDots from 'components/LoadingDots';

export default class Pads extends Component {

  static contextTypes = {
      history: PropTypes.object
  };

  componentDidMount() {
    this.props.fetchPads();
    this.props.fetchUsers();
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
    const ownerName = (usersData[userId]) ? usersData[userId].name : 'Unknown';
    const ownerPic = (usersData[userId]) ? <img src={usersData[userId].image} /> : '';

    return (
      <div className="padList-ownerInfo">
        <span className="padList-ownerPic">{ ownerPic }</span>
        <span className="padList-owner">{ ownerName }</span>
      </div>
    )
  }

  renderPads() {
    const { padsData } = this.props;
    const padRows = [];

    each(padsData, (value, key) => {
      const { user: userId, id: padId, title, tags } = value;
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
            { this.renderUser(userId) }
            <div className="padList-control">
              <i className="icon-pencil"></i>
              <i className="icon-trash"></i>
            </div>
          </div>
        </div>
      );
    });

    return padRows;
  }

  render() {
    const { isFetching, padsFetchResult } = this.props;
    return (
      <div className="padList">
        { isFetching && <LoadingDots /> }
        { padsFetchResult && this.renderPads() }
      </div>
    );
  }
}

Pads.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  padsFetchResult: PropTypes.bool,
  padsFetchMessage: PropTypes.string,
  padsData: PropTypes.array.isRequired,
  usersData: PropTypes.array.isRequired,

  fetchPads: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    result: padsFetchResult,
    message: padsFetchMessage,
    data: padsData
  } = state.pads;

  const { data: usersData } = state.users;
  const { isFetching } = state.process;

  return {
    isFetching: isFetching,
    padsFetchResult: padsFetchResult,
    padsFetchMessage: padsFetchMessage,
    padsData: padsData,
    usersData: usersData
  };
}

export default connect(
  mapStateToProps,
  { fetchPads, fetchUsers }
)(Pads);
