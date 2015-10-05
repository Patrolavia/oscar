import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import linkState from 'react-addons-linked-state-mixin';
import ReactMixin from 'react-mixin';
import classNames from 'classnames';

export default class ToolbarCreateForm extends Component {

  constructor() {
    super();
    this.defaultState = {
      isActive: false
    }
    this.state = this.defaultState;
  }

  componentDidMount() {
    const { createAnimationController } = this.props;
    this.animateController = createAnimationController(findDOMNode(this));
    console.log(this.animateController)
  }

  componentWillReceiveProps(nextProps) {
    (nextProps.isActive) ? this.animateController.play() : this.animateController.reverse();
    this.setState(nextProps);
  }

  onChangeInputHandler() {
  }

  onClickCancelHandler() {
    this.props.toggleState('createFormActive');
  }

  render() {
    const { isActive } = this.state;
    return (
      <div className={classNames('toolbar-form', {'is-active': isActive})} data-type="createForm">
        <div className="toolbar-create">
          <span className="toolbar-formTitle">Create a new pad</span>
          <input type="text" />
          <a className="button">Create</a>
          <a className="button cancel" onClick={this.onClickCancelHandler.bind(this)}>Cancel</a>
        </div>
        <div className="toolbar-errorMsg">Not logged in.</div>
      </div>
    );
  }
}

ToolbarCreateForm.propTypes = {
  isActive: PropTypes.bool.isRequired,
  toggleState: PropTypes.func.isRequired,
  createAnimationController: PropTypes.func.isRequired
};

// ReactMixin(EditorContent.prototype, linkState)
