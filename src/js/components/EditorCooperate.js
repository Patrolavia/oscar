import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from 'actions';
import linkState from 'react-addons-linked-state-mixin';
import ReactMixin from 'react-mixin';
import TagsInput from 'react-tagsinput';
import { each } from 'lodash';

export default class EditorCooperate extends Component {

  constructor() {
    super();
    this.defaultState = {
      cooperator: []
    }
    this.state = this.defaultState;
    this.hasFetched = false;
  }

  componentWillReceiveProps(nextProps) {
    const { isFetching, cooperator } = nextProps;
    if (isFetching) {
      this.setState(this.defaultState);
    } else {
      if (cooperator.length) {
        const ret = [];
        each(cooperator, (value) => {
          ret.push(value.name)
        })
        this.setState({
          cooperator: ret
        })
      }
    }
  }


  onChangeInputHandler(e) {
    console.log('onChangeInputHandler');
    const { fetchUsers } = this.props;
    if (e.length) {
      if (! this.hasFetched) {
        fetchUsers();
        this.hasFetched = true;
      }
    }
  }

  render() {
    const { authority } = this.props;
    return (
      <TagsInput
        addOnBlur={false}
        ref='cooperateInput'
        valueLink={this.linkState('cooperator')}
        placeholder="Search"
        onChangeInput={this.onChangeInputHandler.bind(this)}
        addKeys={[]} />
    );
  }
}

EditorCooperate.propTypes = {
  isFetching: PropTypes.bool,
  cooperator: PropTypes.array,
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
