import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { fetchPad } from 'actions';

import EditorTitle from 'components/EditorTitle';
import EditorContent from 'components/EditorContent';

export default class Editor extends Component {
  componentDidMount() {
    const { fetchPad, params } = this.props;
    fetchPad(params);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchPad, location: { pathname } } = this.props;
    if (pathname !== nextProps.location.pathname) {
      fetchPad(nextProps.params);
    }
  }

  render() {
    const { isFetching, result } = this.props;
    return (
      <div className="editPad" ref="editPad">
        <div className="editPad-title">
          <span className="editPad-optionTitle">Pad title</span>
          <EditorTitle ref="EditTitle" { ...this.props } authority={ true }/>
        </div>
        <div className="editPad-content">
          <span className="editPad-optionTitle">Content</span>
          <EditorContent ref="EditContent" { ...this.props } authority={ true } />
        </div>
        <div className="editPad-options">
          <div className="editPad-cooperates">
            <span className="editPad-optionTitle">Cooperate</span>
            <input ref="EditCooperate"/>
          </div>
          <div className="editPad-tags">
            <span className="editPad-optionTitle">Tags</span>
            <input ref="EditTag" />
          </div>
          <div className="editPad-submit">
            <a className="button-wb button-larger">Submit</a>
            <a className="button-wb button-larger cancel">Cancel</a>
          </div>
          <div className="editPad-errorMsg" ref="errorMsg">
            <span>Error msg</span>
          </div>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
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
)(Editor);
