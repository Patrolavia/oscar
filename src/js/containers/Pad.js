import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { fetchPad, searchPad, initToc, resetPadState } from 'actions';
import { each, isEqual, forEach } from 'lodash';
import { connect } from 'react-redux';
import LoadingDots from 'components/LoadingDots';
import MsgBox from 'components/MsgBox';
import { fadeIn } from 'untils/animation';
import classNames from 'classnames';
import 'vendor/prettify/prettify';

const prettyPrint = window.prettyPrint;

export default class Pad extends Component {
  static contextTypes = {
      history: PropTypes.object
  };

  componentWillMount() {
    const { params } = this.props;
    this.props.fetchPad(params);
  }

  componentWillReceiveProps(nextProps) {
    const { pathname } = this.props.location;
    if (pathname !== nextProps.location.pathname) {
      this.props.fetchPad(nextProps.params);
    }
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.data, nextProps.data) || this.props.isFetching !== nextProps.isFetching;
  }

  componentDidUpdate() {
    const $contentNode = findDOMNode(this.refs.contentWrapper);
    fadeIn($contentNode);
    prettyPrint();

    const contentFirstElement = findDOMNode(this.refs.innerContent);
    if (contentFirstElement && contentFirstElement.firstChild) {
      const contentFirstElementTag = contentFirstElement.firstChild.tagName;
      if (contentFirstElementTag.match(/H[1-6]/)) {
        contentFirstElement.firstChild.setAttribute('class', 'is-topHeading');
      }

      const contentHeadingElements = contentFirstElement.querySelectorAll('h1, h2, h3');
      forEach(contentHeadingElements, (el) => {
        const idAttribute = el.innerHTML.replace(/ /g, '_');
        el.id = idAttribute;
      });
      this.props.initToc({headings: contentHeadingElements});
    }
  }

  componentWillUnmount() {
    this.props.resetPadState();
  }

  onClickTag(value) {
    this.context.history.pushState(null, '/');
    this.props.searchPad({
      type: 'tag',
      inputed: value
    });
  }

  renderTags(tags) {
    const tagRows = [];
    each(tags, (value, index) => {
      tagRows.push(
        <span className="content-tag" key={index} onClick={ this.onClickTag.bind(this, value) }>{ value }</span>
      );
    });

    return tagRows;
  }

  renderPad() {
    const { data: { html, tags } } = this.props;
    return (
      <div>
        <div className={classNames('content-tags', {'dn': !tags.length})}>
          <i className="icon-tags"></i>
          { this.renderTags(tags)}
        </div>
        <div id="innerContent" ref="innerContent" dangerouslySetInnerHTML={{__html: html}}></div>
      </div>
    );
  }

  render() {
    const { isFetching, result, errorStatus } = this.props;
    const currentMsgState = (errorStatus) ? 'unknownError' : 'noSuchPad';
    const msgContent = (isFetching) ? <LoadingDots /> : <MsgBox state={ currentMsgState } />;

    return (
      <div ref="contentWrapper">
        { result ? this.renderPad() : msgContent }
      </div>
    );
  }
}

Pad.propTypes = {
  location: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  result: PropTypes.bool,
  data: PropTypes.object,
  errorStatus: PropTypes.number,
  params: PropTypes.object,

  fetchPad: PropTypes.func.isRequired,
  searchPad: PropTypes.func.isRequired,
  initToc: PropTypes.func.isRequired,
  resetPadState: PropTypes.func.isRequired
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
  { fetchPad, searchPad, initToc, resetPadState }
)(Pad);
