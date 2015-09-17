import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default class Toolbar extends Component {
  render() {
    return (
      <div className="toolbar">
        <div className="toolbar-action">
          <i className="icon-plus"></i>
          <i className="icon-search"></i>
        </div>
        <i className="icon-home"></i>
        <div className="toolbar-form dn" data-type="createForm">
          <div className="toolbar-create">
            <span className="toolbar-formTitle">Create a new pad</span>
            <input type="text" />
            <a className="button">Create</a>
            <a className="button cancel">Cancel</a>
          </div>
          <div className="toolbar-errorMsg">Not logged in.</div>
        </div>
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
      </div>
    );
  }
}
