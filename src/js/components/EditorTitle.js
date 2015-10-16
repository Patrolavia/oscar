import React, { Component, PropTypes } from 'react';
import linkState from 'react-addons-linked-state-mixin';
import ReactMixin from 'react-mixin';

export default class EditorTitle extends Component {
  constructor() {
    super();
    this.defaultState = {
      title: '',
      isChanged: false
    }
    this.state = this.defaultState;
  }

  componentWillReceiveProps(nextProps) {
    const { fetchPadResult, data } = nextProps;
    if (nextProps.isFetching) {
      this.setState(this.defaultState);
    } else {
      if (fetchPadResult) {
        this.setState({
          title: data.title
        })
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.state.title !== nextProps.title;
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
      <input
        type="text"
        readOnly={! this.props.authority}
        valueLink={this.linkState('title')}
        onInput={this.onChangeInputHandler.bind(this)} />
    );
  }
}

EditorTitle.propTypes = {
  fetchPadResult: PropTypes.bool.isRequired,
  data: PropTypes.object,
  authority: PropTypes.bool.isRequired
};

ReactMixin(EditorTitle.prototype, linkState)
