import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { fetchPad, fetchUser } from 'actions';
import { each, findWhere } from 'lodash';

import EditorTitle from 'components/EditorTitle';
import EditorContent from 'components/EditorContent';
import EditorCooperate from 'components/EditorCooperate';
import EditorTags from 'components/EditorTags';

export default class Editor extends Component {

  constructor() {
    super();
    this.state = {
      cooperator: [],
      tags: []
    }
  }

  componentDidMount() {
    const { fetchPad, fetchUser, params } = this.props;
    fetchPad(params);
  }

  componentWillReceiveProps(nextProps) {
    const { isFetching, fetchPad, location: { pathname } } = this.props;
    if (pathname !== nextProps.location.pathname) {
      fetchPad(nextProps.params);
    }

    const { result, data, users } = nextProps;
    const { fetchUser } = this.props;
    const isStillFetching = (data.cooperator) ? data.cooperator.length !== this.state.cooperator.length : false;
    const cooperatorList = [];
    const fetchQueue = [];

    if (result && isStillFetching || data.cooperator === undefined) {
      const { cooperator, tags } = data;
      each(cooperator, (value) => {
        const currentUser = findWhere(users.data, { 'id': value });
        if (currentUser) {
          cooperatorList.push(currentUser);
        } else {
          fetchQueue.push(value);
        }
      })

      if (fetchQueue.length) {
        fetchUser(fetchQueue);
      }

      this.setState({
        cooperator: cooperatorList,
        tags: (tags) ? tags : []
      })
    }
  }

  render() {
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
            <EditorCooperate ref="EditCooperate" { ...this.props } cooperator={this.state.cooperator} />
          </div>
          <div className="editPad-tags">
            <span className="editPad-optionTitle">Tags</span>
            <EditorTags ref="EditTag" { ...this.props } tags={this.state.tags}/>
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
    data,
    users: state.users,
    pads: state.pads
  };
}

export default connect(
  mapStateToProps,
  { fetchPad, fetchUser }
)(Editor);
