import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { fetchPad } from 'actions';
import { each } from 'lodash';
import { connect } from 'react-redux';
import LoadingDots from 'components/LoadingDots';
import 'gsap';

export default class Pad extends Component {
  componentDidMount() {
    const { fetchPad, params } = this.props;
    fetchPad(params);
  }

  componentDidUpdate() {
    const $contentNode = findDOMNode(this.refs.contentWrapper);

    if ($contentNode) {
      TweenLite.fromTo(
        $contentNode, 0.5,
        {opacity: 0, ease: "Power1.easeOut"},
        {opacity: 1}
      );
    };
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

  render() {
    const { isFetching, result, data: { tags, html, version } } = this.props;
    return (
      <div ref="contentWrapper">
        { isFetching && <LoadingDots /> }
        { result &&
          <div>
            { tags.length &&
              <div className="content-tags">
                <i className="icon-tags"></i>
                { this.renderTags(tags)}
              </div>
            }
            <div id="innerContent" dangerouslySetInnerHTML={{__html: html}}></div>
          </div>
        }
      </div>
    );
  }
}

Pad.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  result: PropTypes.bool,
  message: PropTypes.string,
  data: PropTypes.object,
  fetchPad: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    isFetching,
    result,
    message,
    data
  } = state.pad;

  return {
    isFetching: isFetching,
    result: result,
    message: message,
    data
  };
}

export default connect(
  mapStateToProps,
  { fetchPad }
)(Pad);
