import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import { assign, forEach, filter, pluck, isEqual } from 'lodash';

export default class ToolbarSearchForm extends Component {

  static contextTypes = {
      history: PropTypes.object
  };

  constructor() {
    super();
    this.defaultState = {
      searchBy: {
        title: true,
        user: false,
        tag: false
      }
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

    // when user click tag
    if (! isEqual(nextProps.searchParams, this.props.searchParams)) {
      this.context.history.pushState(null, '/');
      const { type, inputed } = nextProps.searchParams;
      const newState = assign({}, this.defaultState, {
        searchBy: {
          [type]: true
        }
      })

      this.setState(newState);
      if (! this.props.isActive) {
        this.props.toggleState('searchModeActive');
      }
      findDOMNode(this.refs.inputer).value = inputed;
    }
  }

  onClickCloseHandler() {
    const { toggleState, searchCancel } = this.props;

    toggleState('searchModeActive');
    searchCancel();
    this.setState(assign({}, this.defaultState, {own: false}));
  }

  onInputChanged(e, type) {
    const { searchPad, searchCancel } = this.props;

    if (e.target.value.length) {
      if (! type && this.state.searchBy.user || type && type === 'user') {
        const { data: usersData } = this.props.usersState;
        const matchedUsersId = pluck(filter(usersData, function(data) {
          var inputed = e.target.value.toLowerCase();
          return ~ data.name.toLowerCase().indexOf(inputed);
        }), 'id');

        searchPad({
          type: 'user',
          inputed: e.target.value,
          usersId: matchedUsersId
        });

      } else {
        let currentType = type;
        if (! type) {
          forEach(this.state.searchBy, (value, key) => {
            if (value) currentType = key;
          })
        }

        searchPad({
          type: currentType,
          inputed: e.target.value
        });

      }
    } else {
      searchCancel();
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
      this.onInputChanged({target: inputer}, type);
    }
  }

  onChangeCheckbox(e) {
    const { searchOwn, searchAll } = this.props;
    const isChecked = e.target.checked;

    this.setState({own: isChecked});
    if (e.target.checked) {
      searchOwn();
    } else {
      searchAll();
    }
  }

  render() {
    const { isActive, isLogged } = this.props;
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
        <div className={classNames('toolbar-searchOptions', {'dn': ! isLogged})}>
          <span className="toolbar-toggleSearchOptions">Options</span>
          <label className="toolbar-searchOption" htmlFor="searchMine">
            <input id="searchMine" type="checkbox" checked={this.state.own} onChange={ this.onChangeCheckbox.bind(this) }/>
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
  isLogged: PropTypes.bool.isRequired,
  toggleState: PropTypes.func.isRequired,
  searchPad: PropTypes.func.isRequired,
  searchCancel: PropTypes.func.isRequired,
  searchOwn: PropTypes.func.isRequired,
  searchAll: PropTypes.func.isRequired,
  usersState: PropTypes.object.isRequired,
  searchParams: PropTypes.object
};
