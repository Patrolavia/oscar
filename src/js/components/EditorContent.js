import React, { Component, PropTypes } from 'react';
import linkState from 'react-addons-linked-state-mixin';
import ReactMixin from 'react-mixin';
import { isEqual } from 'lodash';

export default class EditorContent extends Component {

  constructor() {
    super();
    this.defaultState = {
      content: ''
    }
    this.state = this.defaultState;
  }

  componentWillReceiveProps(nextProps) {
    const { fetchPadResult, message, data } = nextProps;
    if (nextProps.isFetching) {
      this.setState(this.defaultState);
    } else {
      if (fetchPadResult && this.props.data.content !== data.content) {
        this.setState({
          content: data.content
        })
      }
    }
  }

  onChangeInputHandler() {
    if (! this.state.isChanged) {
      this.setState({
        isChanged: true
      })
    }
  }

  getState() {
    return this.state;
  }

  render() {
    const { authority } = this.props;
    return (
      <textarea
        type="text"
        readOnly={! this.props.authority}
        valueLink={this.linkState('content')}
        onInput={this.onChangeInputHandler.bind(this)} />
    );
  }
}

EditorContent.propTypes = {
  fetchPadResult: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    content: PropTypes.string
  }),
  authority: PropTypes.bool.isRequired
};

ReactMixin(EditorContent.prototype, linkState)
