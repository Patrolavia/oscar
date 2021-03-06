import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import { assign, forEach, filter, pluck, isEqual } from 'lodash';
import g11n from 'utils/g11n';
import 'gsap';

const TimelineLite = window.TimelineLite;
const TweenMax = window.TweenMax;

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
    };
    this.state = this.defaultState;
  }

  componentDidMount() {
    this.createAnimationController();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive) {
      this.animationController.play();
    } else {
      this.animationController.reverse();
    }

    // when user click tag
    if (!isEqual(nextProps.searchParams, this.props.searchParams)) {
      this.context.history.pushState(null, '/');
      const { type, inputed } = nextProps.searchParams;
      const newState = assign({}, this.defaultState, {
        searchBy: {
          [type]: true
        }
      });

      this.setState(newState);
      if (!this.props.isActive) {
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
    const { searchPad } = this.props;

    if (e.target.value.length) {
      if (!type && this.state.searchBy.user || type && type === 'user') {
        const { data: usersData } = this.props.usersState;
        const matchedUsersId = pluck(filter(usersData, (data) => {
          var inputed = e.target.value.toLowerCase();
          return ~data.name.toLowerCase().indexOf(inputed);
        }), 'id');

        searchPad({
          type: 'user',
          inputed: e.target.value,
          usersId: matchedUsersId
        });
      } else {
        let currentType = type;
        if (!type) {
          forEach(this.state.searchBy, (value, key) => {
            if (value) currentType = key;
          });
        }

        searchPad({
          type: currentType,
          inputed: e.target.value
        });
      }
    }
  }

  onClickSearchType(type) {
    const inputer = findDOMNode(this.refs.inputer);
    const newState = assign({}, this.defaultState, {
      searchBy: {
        [type]: true
      }
    });
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

  createAnimationController() {
    const animationTimeline = new TimelineLite();

    var TMinitConfig = {
      rotationX: 90,
      top: -40,
      ease: 'Power2.easeInOut'
    };

    var TMTimelineConfig = {
      rotationX: 0,
      top: 65,
      ease: 'Back.easeOut',
      onStart: () => {
        document.querySelector('.aside').classList.add('is-active');
      },
      onComplete: () => {
        findDOMNode(this).classList.add('is-active');
      },
      onReverseComplete: () => {
        findDOMNode(this).classList.remove('is-active');
        document.querySelector('.aside').classList.remove('is-active');
      }
    };

    const targetNode = findDOMNode(this);
    TweenMax.to(targetNode, 0, TMinitConfig);
    animationTimeline.to(targetNode, 0.5, TMTimelineConfig);
    animationTimeline.pause();

    this.animationController = animationTimeline;
  }

  render() {
    const { isLogged } = this.props;
    const { searchBy: { title, user, tag } } = this.state;

    return (
      <div className="toolbar-form" data-type="searchForm">
        <div className="toolbar-search">
          <span className="toolbar-formTitle">{ g11n.t('search.form.title') }</span>
          <input type="text" onChange={this.onInputChanged.bind(this)} ref="inputer"/>
          <dl className="toolbar-searchTypes">
            <dt className={classNames('toolbar-searchType', {'is-active': title})} onClick={ this.onClickSearchType.bind(this, 'title') }>
              <i className="icon-doc-inv"></i>
              <span>{ g11n.t('search.type.title') }</span>
            </dt>
            <dt className={classNames('toolbar-searchType', {'is-active': user})} onClick={ this.onClickSearchType.bind(this, 'user') }>
              <i className="icon-user"></i>
              <span>{ g11n.t('search.type.user') }</span>
            </dt>
            <dt className={classNames('toolbar-searchType', {'is-active': tag})} onClick={ this.onClickSearchType.bind(this, 'tag') }>
              <i className="icon-tags"></i>
              <span>{ g11n.t('search.type.tag') }</span>
            </dt>
          </dl>
        </div>
        <div className={classNames('toolbar-searchOptions', {'dn': !isLogged})}>
          <span className="toolbar-toggleSearchOptions">{ g11n.t('search.options.title') }</span>
          <label className="toolbar-searchOption" htmlFor="searchMine">
            <input id="searchMine" type="checkbox" checked={this.state.own} onChange={ this.onChangeCheckbox.bind(this) }/>
            <span>{ g11n.t('search.options.onlyMine') }</span>
          </label>
        </div>
        <a className="button toolbar-searchBtn">{ g11n.t('search.button.reset') }</a>
        <a className="button cancel toolbar-searchBtn" onClick={this.onClickCloseHandler.bind(this)}>{ g11n.t('search.button.close') }</a>
      </div>
    );
  }
}

ToolbarSearchForm.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  toggleState: PropTypes.func.isRequired,
  searchPad: PropTypes.func.isRequired,
  searchCancel: PropTypes.func.isRequired,
  searchOwn: PropTypes.func.isRequired,
  searchAll: PropTypes.func.isRequired,
  usersState: PropTypes.object.isRequired,
  searchParams: PropTypes.object
};
