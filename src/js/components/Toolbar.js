import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { clone } from 'lodash';
import classNames from 'classnames';
import gsap from 'gsap';

import ToolbarSearchForm from 'components/ToolbarSearchForm';

export default class Toolbar extends Component {

  static contextTypes = {
      history: PropTypes.object
  };

  constructor() {
    super();
    this.defaultState = {
      createFormActive: false,
      searchFormActive: false
    }
    this.state = this.defaultState;
  }

  onClickHomeHandler() {
    this.context.history.pushState(null, '/');
  }

  toggleState(formType) {
    if (formType.match(/create/)) {
      this.context.history.pushState(null, '/create');
    }
    let ret = clone(this.defaultState);
    ret[formType] = ! this.state[formType];
    this.setState(ret);
  }

  createAnimationController(targetNode) {
    const animationTimeline = new TimelineLite();

    var TMinitConfig = {
      rotationX: 90,
      ease: "Power2.easeInOut"
    }

    var TMTimelineConfig = {
      rotationX: 0,
      ease: "Back.easeOut",
      onComplete: function() {
        this.target.classList.add('is-active');
      },
      onReverseComplete: function() {
        this.target.classList.remove('is-active');
      }
    }

    TweenMax.to(targetNode, 0, TMinitConfig);
    animationTimeline.to(targetNode, 0.5, TMTimelineConfig);
    animationTimeline.pause();

    return animationTimeline;
  }

  render() {
    const { createFormActive, searchFormActive } = this.state;
    return (
      <div className="toolbar">
        <div className="toolbar-action">
          <i className={classNames('icon-plus', {'is-active': createFormActive})} onClick={this.toggleState.bind(this, 'createFormActive')}></i>
          <i className={classNames('icon-search', {'is-active': searchFormActive})} onClick={this.toggleState.bind(this, 'searchFormActive')}></i>
        </div>
        <i className="icon-home" onClick={this.onClickHomeHandler.bind(this)}></i>
        <ToolbarSearchForm
          isActive={ searchFormActive }
          createAnimationController={this.createAnimationController}
          toggleState={this.toggleState.bind(this)} />
      </div>
    );
  }
}
