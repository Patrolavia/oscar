import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

export default class FloatToolButton extends Component {
  static contextTypes = {
      history: PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      isActive: false
    }
  }

  onClickHandler() {
    const path = (this.state.isActive) ? '/create' : '/';
    this.context.history.pushState(null, path);
  }

  componentDidMount() {
    const { pathname } = this.props.location;
    this.setState({isActive: pathname === '/'});
  }

  componentWillReceiveProps(nextProps) {
    const { pathname } = nextProps.location;
    this.setState({isActive: pathname === '/'});
  }

  render() {
    const { isActive } = this.state;
    return (
      <a className="container-floatBtn" onClick={this.onClickHandler.bind(this)}>
        <i className={classNames({'icon-home': ! isActive}, {'icon-plus': isActive})}></i>
      </a>
    )
  }
}

FloatToolButton.propTypes = {
  location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    location: state.router.location
  };
}

export default connect(
  mapStateToProps
)(FloatToolButton);
