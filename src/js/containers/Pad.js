import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { fetchPad } from 'actions';
import { each } from 'lodash';
import { connect } from 'react-redux';
import LoadingDots from 'components/LoadingDots';
import MsgBox from 'components/MsgBox';
import { fadeIn } from 'untils/animation';
import 'vendor/prettify/prettify';

export default class Pad extends Component {
  componentWillMount() {
    const { fetchPad, params } = this.props;
    fetchPad(params);
  }

  componentDidUpdate() {
    const $contentNode = findDOMNode(this.refs.contentWrapper);
    fadeIn($contentNode);
    prettyPrint();
  }

  componentWillReceiveProps(nextProps) {
    const { fetchPad, location: { pathname } } = this.props;
    if (pathname !== nextProps.location.pathname) {
      fetchPad(nextProps.params);
    }
  }

  renderTags(tags) {
    const tagRows = [];
    each(tags, (value, index) => {
      tagRows.push(
        <span className="content-tag" key={index}>{ value }</span>
      )
    });

    return tagRows;
  }

  renderPad() {
    const { data: { html, tags, version } } = this.props;
    return (
      <div>
        { tags.length &&
          <div className="content-tags">
            <i className="icon-tags"></i>
            { this.renderTags(tags)}
          </div>
        }
        <div id="innerContent" dangerouslySetInnerHTML={{__html: html}}></div>
      </div>
    )
  }

  render() {
    const { isFetching, result, errorStatus } = this.props;
    const currentMsgState = (errorStatus) ? 'unknownError' : 'noSuchPad';

    return (
      <div ref="contentWrapper">
        { result ?
          this.renderPad()
        :
          isFetching ? <LoadingDots /> : <MsgBox state={ currentMsgState } />
        }
      </div>
    );
  }
}

Pad.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  result: PropTypes.bool,
  data: PropTypes.object,
  errorStatus: PropTypes.number,
  fetchPad: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    isFetching,
    result,
    data,
    errorStatus
  } = state.pad;

  return {
    isFetching: isFetching,
    result: result,
    errorStatus: errorStatus,
    data
  };
}

export default connect(
  mapStateToProps,
  { fetchPad }
)(Pad);
