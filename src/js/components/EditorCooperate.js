import React, { Component, PropTypes } from 'react';
import { fetchUser } from 'actions';
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
  }

  componentWillReceiveProps(nextProps) {
    const { isFetching, cooperator } = nextProps;
    if (isFetching) {
      this.setState(this.defaultState);
    } else {
      if (cooperator.length) {
        this.setState({
          cooperator: cooperator
        })
      }
    }
  }


  onChangeInputHandler() {
    console.log('onChangeInputHandler');
  }

  render() {
    const { authority } = this.props;
    return (
      <TagsInput
        addOnBlur={false}
        ref='cooperateInput'
        valueLink={this.linkState('cooperator')}
        placeholder="Search"
        onChangeInput={this.onChangeInputHandler}
        addKeys={[]} />
    );
  }
}

EditorCooperate.propTypes = {
  isFetching: PropTypes.bool,
  cooperator: PropTypes.array
};

ReactMixin(EditorCooperate.prototype, linkState)
