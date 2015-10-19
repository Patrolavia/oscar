import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import linkState from 'react-addons-linked-state-mixin';
import ReactMixin from 'react-mixin';
import classNames from 'classnames';
import { assign, forEach } from 'lodash';

export default class ToolbarSearchForm extends Component {

  constructor() {
    super();
    this.defaultState = {
      searchBy: {
        title: true,
        user: false,
        tag: false
      },
      own: false
    }
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

  onInputChanged(e, type) {
    if (e.target.value.length) {
      if (! type && this.state.searchBy.user || type && type === 'user') {
        this.props.searchPad({
          type: 'user',
          users: [0, 1]
        });
      } else {
        let currentType = type;
        if (! type) {
          forEach(this.state.searchBy, (value, key) => {
            if (value) currentType = key;
          })
        }

        this.props.searchPad({
          type: currentType,
          keyword: e.target.value
        });
      }
    } else {
      this.props.searchCancel();
    }
  }

  onClickSearchType(type) {
    const inputer = findDOMNode(this.refs.inputer);
    const newState = assign({}, this.defaultState, {
      searchBy: {
        [type]: true
      }
    })
    this.setState(newState);

    if (inputer.value.length) {
      this.onInputChanged({target: findDOMNode(this.refs.inputer)}, type);
    }
  }

  render() {
    const { isActive } = this.props;
    const { searchBy: { title, user, tag } } = this.state;
    return (
      <div className="toolbar-form" data-type="searchForm">
        <div className="toolbar-search">
          <span className="toolbar-formTitle">Search pad</span>
          <input type="text" onChange={this.onInputChanged.bind(this)} ref="inputer"/>
          <dl className="toolbar-searchTypes">
            <dt className={classNames('toolbar-searchType', {'is-active': title})} onClick={ this.onClickSearchType.bind(this, 'title') }>
              <i className="icon-doc-inv"></i>
              <span>Title</span>
            </dt>
            <dt className={classNames('toolbar-searchType', {'is-active': user})} onClick={ this.onClickSearchType.bind(this, 'user') }>
              <i className="icon-user"></i>
              <span>User</span>
            </dt>
            <dt className={classNames('toolbar-searchType', {'is-active': tag})} onClick={ this.onClickSearchType.bind(this, 'tag') }>
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
  toggleState: PropTypes.func.isRequired,
  searchPad: PropTypes.func.isRequired,
  searchCancel: PropTypes.func.isRequired,
  usersState: PropTypes.object.isRequired
};
