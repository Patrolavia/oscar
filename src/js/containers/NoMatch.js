import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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
    const { data: { html, title } } = this.props;
    return (
      <div ref="contentWrapper">
        <hr />
        <h5>{ title }</h5>
        <div className="content-whale" dangerouslySetInnerHTML={{__html: html}}></div>
      </div>
    )
  }

  render() {
    const { isFetching, result } = this.props;
    return (
      <div id="innerContent">
        <MsgBox state="pageNotFound" />
        { ! isFetching && result && this.renderWhale() }
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
