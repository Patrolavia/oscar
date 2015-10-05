import React, { Component, PropTypes } from 'react';
import linkState from 'react-addons-linked-state-mixin';
import ReactMixin from 'react-mixin';

export default class ToolbarSearchForm extends Component {

  constructor() {
    super();
    this.defaultState = {}
    this.state = this.defaultState;
  }

  componentWillReceiveProps(nextProps) {
  }

  onChangeInputHandler() {
  }

  render() {
    return (
      <div className="toolbar-form dn" data-type="searchForm">
        <div className="toolbar-search">
          <span className="toolbar-formTitle">Search pad</span>
          <input type="text" />
          <dl className="toolbar-searchTypes">
            <dt className="toolbar-searchType">
              <i className="icon-doc-inv"></i>
              <span>Title</span>
            </dt>
            <dt className="toolbar-searchType">
              <i className="icon-user"></i>
              <span>User</span>
            </dt>
            <dt className="toolbar-searchType">
              <i className="icon-tags"></i>
              <span>Tag</span>
            </dt>
          </dl>
        </div>
        <div className="toolbar-searchOptions">
          <span className="toolbar-toggleSearchOptions">Options</span>
          <label className="toolbar-searchOption" htmlFor="searchMine">
            <input id="searchMine" type="checkbox" />
            <span>Only mine</span>
          </label>
        </div>
        <a className="button toolbar-searchBtn">Reset</a>
        <a className="button cancel toolbar-searchBtn">Close</a>
      </div>
    );
  }
}

// EditorContent.propTypes = {
//   result: PropTypes.bool.isRequired,
//   data: PropTypes.shape({
//     content: PropTypes.string
//   }),
//   authority: PropTypes.bool.isRequired
// };

// ReactMixin(EditorContent.prototype, linkState)
