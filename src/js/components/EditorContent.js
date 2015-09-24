import React, { Component, PropTypes } from 'react';
import linkState from 'react-addons-linked-state-mixin';
import ReactMixin from 'react-mixin';

export default class EditorContent extends Component {

  constructor() {
    super();
    this.defaultState = {
      content: ''
    }
    this.state = this.defaultState;
  }

  componentWillReceiveProps(nextProps) {
    const { result, message, data } = nextProps;
    if (nextProps.isFetching) {
      this.setState(this.defaultState);
    } else {
      if (result) {
        this.setState({
          content: data.content
        })
      }
    }
  }

  getContent() {
    return this.state.content;
  }

  render() {
    const { authority } = this.props;
    return (
      <textarea type="text" readOnly={! this.props.authority} valueLink={this.linkState('content')}/>
    );
  }
}

EditorContent.propTypes = {
  result: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    content: PropTypes.string
  }),
  authority: PropTypes.bool.isRequired
};

ReactMixin(EditorContent.prototype, linkState)
