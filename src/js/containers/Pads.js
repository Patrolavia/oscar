import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPads } from 'actions';
import { each } from 'lodash';

export default class Pads extends Component {
  componentDidMount() {
    this.props.fetchPads();
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
    return (
      <div className="padList-ownerInfo">
        <span>*userPic</span>
        <span className="padList-owner"></span>
      </div>
    )
  }

  renderPads() {
    const { data } = this.props;
    const padRows = [];

    each(data, (value, key) => {
      const { user: userId, id: padId, title, tags } = value;
      padRows.push(
        <div className="padList-item" key={ padId }>
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
    const { result, message } = this.props;
    return (
      <div className="padList">
        { this.renderPads() }
      </div>
    );
  }
}

Pads.propTypes = {
  result: PropTypes.bool.isRequired,
  message: PropTypes.string,
  data: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { result, message, data } = state.pads;
  return {
    result: result,
    message: message,
    data: data
  };
}

export default connect(
  mapStateToProps,
  { fetchPads }
)(Pads);
