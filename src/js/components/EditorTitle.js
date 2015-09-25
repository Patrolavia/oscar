import React, { Component, PropTypes } from 'react';
import linkState from 'react-addons-linked-state-mixin';
import ReactMixin from 'react-mixin';

export default class EditorTitle extends Component {
  constructor() {
    super();
    this.defaultState = {
      title: ''
    }
    this.state = this.defaultState;
  }

  componentWillReceiveProps(nextProps) {
    const { result, data } = nextProps;
    if (nextProps.isFetching) {
      this.setState(this.defaultState);
    } else {
      if (result) {
        this.setState({
          title: data.title
        })
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.state.title !== nextProps.title;
  }

  getTitle() {
    return this.state.title;
  }

  render() {
    const { authority } = this.props;
    return (
      <input type="text" readOnly={! this.props.authority} valueLink={this.linkState('title')}/>
    );
  }
}

EditorTitle.propTypes = {
  data: PropTypes.object,
  authority: PropTypes.bool.isRequired
};

ReactMixin(EditorTitle.prototype, linkState)
