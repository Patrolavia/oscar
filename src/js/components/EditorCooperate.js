import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import linkState from 'react-addons-linked-state-mixin';
import ReactMixin from 'react-mixin';
import TagsInput from 'react-tagsinput';
import { each, filter, findWhere, union, indexOf, without } from 'lodash';
import EditorCompletion from 'components/EditorCompletion';
import classNames from 'classnames';

export default class EditorCooperate extends Component {

  constructor() {
    super();
    this.defaultState = {
      cooperatorId: [],
      cooperatorName: [],
      completion: [],
      isChanged: false
    }
    this.state = this.defaultState;
    this.hasFetchedUsers = false;
  }

  componentWillReceiveProps(nextProps) {
    const { isFetching, cooperator, location } = nextProps;
    if (isFetching) {
      this.setState(this.defaultState);
    } else {
      if (this.state.isChanged) { return false }

      const cooperatorName = [];
      const cooperatorId = [];
      each(cooperator, (value) => {
        cooperatorName.push(value.name);
        cooperatorId.push(value.id);
      })
      this.setState({
        cooperatorId: cooperatorId,
        cooperatorName: cooperatorName
      })
    }
  }

  onChangeInputHandler(keyword) {
    clearTimeout(this.keyupTimeout);

    const { fetchUsers, users: { data: usersData } } = this.props;
    if (keyword.length) {
      if (! this.hasFetchedUsers) {
        fetchUsers();
        this.hasFetchedUsers = true;
        this.keyupTimeout = setTimeout(() => {
          this.getCompletion(keyword);
        }, 1000)
      } else {
        this.getCompletion(keyword);
      }
    } else {
      this.resetCompletion();
    }
  }

  getCompletion(keyword) {
    // get filter result
    const { cooperator, users: { data: usersData }, data: { user: ownerId } } = this.props;
    const output = filter(usersData, function(user) {
      var input = keyword.toLowerCase();
      // `~` with `indexOf` means "contains"
      return ~ user.name.toLowerCase().indexOf(input);
    });

    // ignore exist cooperator and owner
    const completionList = [];
    each(output, (item) => {
      const { cooperatorName } = this.state;
      if (indexOf(cooperatorName, item.name) < 0 && item.id !== ownerId) {
        completionList.push(item);
      };
    })

    this.setState({
      completion: completionList
    })
  }

  onClickCompletion(completion) {
    this.refs.cooperateInput.addTag(completion.name);
    this.setState({
      cooperatorId: union(this.state.cooperatorId, [completion.id])
    })
  }

  beforeTagRemoveHandler(removedTag) {
    const currentTagIndex = indexOf(this.state.cooperatorName, removedTag);
    const currentId = this.state.cooperatorId[currentTagIndex];
    this.setState({
      cooperatorId: without(this.state.cooperatorId, currentId)
    });
    return true;
  }

  onTagChangesHandler() {
    clearTimeout(this.keyupTimeout);
    if (! this.state.isChanged) {
      this.setState({
        isChanged: true
      })
    }
    this.resetCompletion();
    this.refs.cooperateInput.clearInput();
    return true;
  }

  resetCompletion() {
    this.setState({
      completion: []
    })
  }

  getState() {
    return this.state;
  }

  render() {
    // Only pad owner can edit cooperate field.
    const { completion } = this.state;
    const { authority } = this.props;
    return (
      <div className={classNames({'is-disable': ! authority})}>
        <TagsInput
          addOnBlur={false}
          ref='cooperateInput'
          valueLink={this.linkState('cooperatorName')}
          placeholder="Search"
          onChangeInput={this.onChangeInputHandler.bind(this)}
          onTagAdd={this.onTagChangesHandler.bind(this)}
          beforeTagRemove={this.beforeTagRemoveHandler.bind(this)}
          addKeys={[]} />

        <EditorCompletion
          type="cooperator"
          onClickCompletion={this.onClickCompletion.bind(this)}
          completion={completion} />
      </div>
    );
  }
}

EditorCooperate.propTypes = {
  authority: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool,
  fetchUsers: PropTypes.func.isRequired,
  cooperatorName: PropTypes.array,
  fetchUsers: PropTypes.func.isRequired
};

ReactMixin(EditorCooperate.prototype, linkState);
