import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import linkState from 'react-addons-linked-state-mixin';
import ReactMixin from 'react-mixin';
import classNames from 'classnames';

export default class ToolbarSearchForm extends Component {

  constructor() {
    super();
    this.defaultState = {}
    this.state = this.defaultState;
  }

  componentDidMount() {
    this.createAnimationController();
  }

  createAnimationController() {
    const animationTimeline = new TimelineLite();

    var TMinitConfig = {
      rotationX: 90,
      top: -40,
      ease: "Power2.easeInOut"
    }

    var TMTimelineConfig = {
      rotationX: 0,
      top: 65,
      ease: "Back.easeOut",
      onComplete: function() {
        this.target.classList.add('is-active');
      },
      onReverseComplete: function() {
        this.target.classList.remove('is-active');
      }
    }

    const targetNode = findDOMNode(this);
    TweenMax.to(targetNode, 0, TMinitConfig);
    animationTimeline.to(targetNode, 0.5, TMTimelineConfig);
    animationTimeline.pause();

    this.animationController = animationTimeline;
  }

  componentWillReceiveProps(nextProps) {
    (nextProps.isActive) ? this.animationController.play() : this.animationController.reverse();
  }

  onClickCloseHandler() {
    this.props.toggleState('searchModeActive');
  }

  render() {
    const { isActive } = this.props;
    return (
      <div className="toolbar-form" data-type="searchForm">
        <div className="toolbar-search">
          <span className="toolbar-formTitle">Search pad</span>
          <input type="text" />
          <dl className="toolbar-searchTypes">
            <dt className="toolbar-searchType">
              <i className="icon-doc-inv"></i>
              <span>Title</span>
            </dt>
            <dt className="toolbar-searchType">
              <i className="icon-user"></i>
              <span>User</span>
            </dt>
            <dt className="toolbar-searchType">
              <i className="icon-tags"></i>
              <span>Tag</span>
            </dt>
          </dl>
        </div>
        <div className="toolbar-searchOptions">
          <span className="toolbar-toggleSearchOptions">Options</span>
          <label className="toolbar-searchOption" htmlFor="searchMine">
            <input id="searchMine" type="checkbox" />
            <span>Only mine</span>
          </label>
        </div>
        <a className="button toolbar-searchBtn">Reset</a>
        <a className="button cancel toolbar-searchBtn" onClick={this.onClickCloseHandler.bind(this)}>Close</a>
      </div>
    );
  }
}

ToolbarSearchForm.propTypes = {
  toggleState: PropTypes.func.isRequired
};

// ReactMixin(EditorContent.prototype, linkState)
