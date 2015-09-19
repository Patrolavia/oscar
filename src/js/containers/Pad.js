import React, { Component, PropTypes } from 'react';
import { fetchPad } from 'actions';
import { each } from 'lodash';
import { connect } from 'react-redux';
import LoadingDots from 'components/LoadingDots';

export default class Pad extends Component {
  componentDidMount() {
    const { fetchPad, params } = this.props;
    fetchPad(params);
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
      <div>
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
  const { isFetching } = state.process;
  const {
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
