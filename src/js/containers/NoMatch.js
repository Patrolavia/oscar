import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPad } from 'actions';
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
        <h3>{ title }</h3>
        <div className="content-whale" dangerouslySetInnerHTML={{__html: html}}></div>
      </div>
    )
  }

  render() {
    const { isFetching, result } = this.props;
    return (
      <div id="innerContent">
        <h1>Page not found.</h1>
        <p>Looks like you are lost. Maybe <Link to="/">go back to list</Link>?</p>
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
