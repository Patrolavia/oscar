import React, { Component, PropTypes } from 'react';
import linkState from 'react-addons-linked-state-mixin';
import reactMixin from 'react-mixin';
import TagsInput from 'react-tagsinput';
import { each, filter, select, union, indexOf } from 'lodash';
import EditorCompletion from 'components/EditorCompletion';

export default class EditorTags extends Component {

  constructor() {
    super();
    this.defaultState = {
      tags: [],
      completion: [],
      isChanged: false
    };
    this.state = this.defaultState;
    this.hasFetchedPads = false;
    this.hasTagChanged = false;
    this.tagList = [];
  }

  componentWillReceiveProps(nextProps) {
    const { isFetching, tags } = nextProps;
    if (isFetching) {
      this.setState(this.defaultState);
      this.hasTagChanged = false;
    } else {
      if (this.hasTagChanged) { return false; }

      this.setState({
        tags: tags
      });
    }
  }

  onChangeInputHandler(keyword) {
    clearTimeout(this.keyupTimeout);

    const { fetchPads } = this.props;
    if (keyword.length) {
      if (!this.hasFetchedPads) {
        fetchPads();
        this.hasFetchedPads = true;
        this.keyupTimeout = setTimeout(() => {
          this.getCompletion(keyword);
        }, 1000);
      } else {
        this.getCompletion(keyword);
      }
    } else {
      this.resetCompletion();
    }
  }

  onTagChangesHandler() {
    clearTimeout(this.keyupTimeout);
    if (!this.state.isChanged) {
      this.setState({
        isChanged: true
      });
    }
    this.resetCompletion();
    this.hasTagChanged = true;
    this.refs.tagInput.clearInput();
    return true;
  }

  onClickCompletion(tag) {
    this.refs.tagInput.addTag(tag);
  }

  getCompletion(keyword) {
    if (!this.tagList.length) {
      this.getTagList();
    }

    // get filter result
    const output = filter(this.tagList, (tag) => {
      var input = keyword.toLowerCase();
      // `~` with `indexOf` means "contains"
      return ~tag.toLowerCase().indexOf(input);
    });

    // ignore exist tags
    const completionList = [];
    select(output, (item) => {
      const { tags } = this.state;
      if (indexOf(tags, item) < 0) {
        completionList.push(item);
      }
    });

    this.setState({
      completion: completionList
    });
  }

  getTagList() {
    const { padsState: { data: padsData } } = this.props;
    let ret = [];
    each(padsData, (pad) => {
      ret = union(ret, pad.tags);
    });
    this.tagList = ret;
  }

  getState() {
    return this.state;
  }

  resetCompletion() {
    this.setState({
      completion: []
    });
  }

  render() {
    const { completion } = this.state;
    return (
      <div>
        <TagsInput
          addOnBlur={false}
          ref="tagInput"
          valueLink={this.linkState('tags')}
          placeholder="Search"
          onChangeInput={this.onChangeInputHandler.bind(this)}
          onTagAdd={this.onTagChangesHandler.bind(this)}
          onTagRemove={this.onTagChangesHandler.bind(this)} />

        <EditorCompletion
          type="tags"
          onClickCompletion={this.onClickCompletion.bind(this)}
          completion={completion} />
      </div>
    );
  }
}

EditorTags.propTypes = {
  isFetching: PropTypes.bool,
  tags: PropTypes.array,
  padsState: PropTypes.object.isRequired,
  fetchPads: PropTypes.func.isRequired
};

reactMixin(EditorTags.prototype, linkState);
