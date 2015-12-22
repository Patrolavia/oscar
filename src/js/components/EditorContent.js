import React, { Component, PropTypes } from 'react';
import linkState from 'react-addons-linked-state-mixin';
import reactMixin from 'react-mixin';

export default class EditorContent extends Component {

  constructor() {
    super();
    this.defaultState = {
      content: ''
    };
    this.state = this.defaultState;
  }

  componentWillReceiveProps(nextProps) {
    const { fetchPadResult, data } = nextProps;
    if (nextProps.isFetching) {
      this.setState(this.defaultState);
    } else {
      if (fetchPadResult && this.props.data.content !== data.content) {
        this.setState({
          content: data.content
        });
      }
    }
  }

  onChangeInputHandler() {
    if (!this.state.isChanged) {
      this.setState({
        isChanged: true
      });
    }
  }

  getState() {
    return this.state;
  }

  render() {
    return (
      <textarea
        type="text"
        readOnly={!this.props.authority}
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

reactMixin(EditorContent.prototype, linkState);
