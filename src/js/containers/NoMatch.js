import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { fetchPad } from 'actions';
import MsgBox from 'components/MsgBox';
import { fadeIn } from 'untils/animation';

export default class NoMatch extends Component {
  componentDidMount() {
    this.props.fetchPad('whale');
  }

  componentDidUpdate() {
    const $contentNode = findDOMNode(this.refs.contentWrapper);
    fadeIn($contentNode);
  }

  renderWhale() {
    const { html } = this.props.data;
    return (
      <div ref="contentWrapper">
        <div className="content-whale" dangerouslySetInnerHTML={{__html: html}}></div>
        <MsgBox state="pageNotFound" />
      </div>
    );
  }

  render() {
    const { isFetching, result } = this.props;
    return (
      <div id="innerContent">
        { !isFetching && result && this.renderWhale() }
      </div>
    );
  }
}

NoMatch.propTypes = {
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
    data
  };
}

export default connect(
  mapStateToProps,
  { fetchPad }
)(NoMatch);
