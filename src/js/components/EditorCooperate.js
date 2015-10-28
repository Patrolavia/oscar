import React, { Component, PropTypes } from 'react';
import linkState from 'react-addons-linked-state-mixin';
import reactMixin from 'react-mixin';
import TagsInput from 'react-tagsinput';
import { each, filter, union, indexOf, without } from 'lodash';
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
    };
    this.state = this.defaultState;
    this.hasFetchedUsers = false;
  }

  componentWillReceiveProps(nextProps) {
    const { isFetching, cooperator } = nextProps;
    if (isFetching) {
      this.setState(this.defaultState);
    } else {
      if (this.state.isChanged) { return false; }

      const cooperatorName = [];
      const cooperatorId = [];
      each(cooperator, (value) => {
        cooperatorName.push(value.name);
        cooperatorId.push(value.id);
      });
      this.setState({
        cooperatorId: cooperatorId,
        cooperatorName: cooperatorName
      });
    }
  }

  onChangeInputHandler(keyword) {
    clearTimeout(this.keyupTimeout);

    const { fetchUsers } = this.props;
    if (keyword.length) {
      if (!this.hasFetchedUsers) {
        fetchUsers();
        this.hasFetchedUsers = true;
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

  onClickCompletion(completion) {
    this.refs.cooperateInput.addTag(completion.name);
    this.setState({
      cooperatorId: union(this.state.cooperatorId, [completion.id])
    });
  }

  onTagChangesHandler() {
    clearTimeout(this.keyupTimeout);
    if (!this.state.isChanged) {
      this.setState({
        isChanged: true
      });
    }
    this.resetCompletion();
    this.refs.cooperateInput.clearInput();
    return true;
  }

  getState() {
    return this.state;
  }

  getCompletion(keyword) {
    // get filter result
    const { usersState: { data: usersData }, data: { user: ownerId }, authState } = this.props;
    const output = filter(usersData, (user) => {
      var input = keyword.toLowerCase();
      // `~` with `indexOf` means "contains"
      return ~user.name.toLowerCase().indexOf(input);
    });

    // ignore exist cooperator and owner
    const completionList = [];
    each(output, (item) => {
      const { cooperatorName } = this.state;
      if (indexOf(cooperatorName, item.name) < 0 && item.id !== ownerId && item.id !== authState.data.id) {
        completionList.push(item);
      }
    });

    this.setState({
      completion: completionList
    });
  }

  resetCompletion() {
    this.setState({
      completion: []
    });
  }

  beforeTagRemoveHandler(removedTag) {
    const currentTagIndex = indexOf(this.state.cooperatorName, removedTag);
    const currentId = this.state.cooperatorId[currentTagIndex];
    this.setState({
      cooperatorId: without(this.state.cooperatorId, currentId)
    });
    return true;
  }

  render() {
    // Only pad owner can edit cooperate field.
    const { completion } = this.state;
    const { authority } = this.props;
    return (
      <div className={classNames({'is-disable': !authority})}>
        <TagsInput
          addOnBlur={false}
          ref="cooperateInput"
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
  data: PropTypes.object.isRequired,
  cooperatorName: PropTypes.array,
  authState: PropTypes.object.isRequired,
  usersState: PropTypes.object.isRequired
};

reactMixin(EditorCooperate.prototype, linkState);
