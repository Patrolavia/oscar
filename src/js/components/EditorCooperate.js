import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from 'actions';
import linkState from 'react-addons-linked-state-mixin';
import ReactMixin from 'react-mixin';
import TagsInput from 'react-tagsinput';
import { each, filter, findWhere, merge, indexOf } from 'lodash';
import EditorCompletion from 'components/EditorCompletion';
import classNames from 'classnames';

export default class EditorCooperate extends Component {

  constructor() {
    super();
    this.defaultState = {
      cooperatorName: [],
      completion: []
    }
    this.state = this.defaultState;
    this.hasFetchedUsers = false;
    this.hasTagChanged = false;
  }

  componentWillReceiveProps(nextProps) {
    const { isFetching, cooperator, location } = nextProps;
    if (isFetching) {
      this.setState(this.defaultState);
      this.hasTagChanged = false;
    } else {
      if (this.hasTagChanged) { return false }

      const ret = [];
      each(cooperator, (value) => {
        ret.push(value.name)
      })
      this.setState({
        cooperatorName: ret
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

  onClickCompletion(userName) {
    this.refs.cooperateInput.addTag(userName);
  }

  onTagChangesHandler() {
    clearTimeout(this.keyupTimeout);
    this.resetCompletion();
    this.hasTagChanged = true;
    this.refs.cooperateInput.clearInput();
    return true;
  }

  resetCompletion() {
    this.setState({
      completion: []
    })
  }

  render() {
    // Only pad owner can edit cooperate field.
    const { completion } = this.state;
    const { auth, data: { user: ownerId }, authority } = this.props;
    const isOwner = (authority) ? ownerId === auth.data.id : false;
    return (
      <div className={classNames({'is-disable': ! isOwner})}>
        <TagsInput
          addOnBlur={false}
          ref='cooperateInput'
          valueLink={this.linkState('cooperatorName')}
          placeholder="Search"
          onChangeInput={this.onChangeInputHandler.bind(this)}
          onTagAdd={this.onTagChangesHandler.bind(this)}
          onTagRemove={this.onTagChangesHandler.bind(this)}
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
  cooperatorName: PropTypes.array,
  fetchUsers: PropTypes.func.isRequired
};

ReactMixin(EditorCooperate.prototype, linkState)

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  { fetchUsers }
)(EditorCooperate);
