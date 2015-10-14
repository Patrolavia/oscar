import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { indexOf, union } from 'lodash';
import classNames from 'classnames';

export default class PadOptions extends Component {
  static contextTypes = {
      history: PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      editPad: false,
      deletePad: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const { authState: { result: isLogged, data: { id: userId } }, authorityInfo: { ownerId, cooperatorList } } = nextProps;
    let newState = {};
    if (isLogged) {
      newState['editPad'] = indexOf(union([ownerId], cooperatorList), userId) >= 0;
      newState['deletePad'] = userId === ownerId
    }
    this.setState(newState);
  }

  onClickEdit(e) {
    const { padId } = this.props;
    const path = '/edit/' + padId;
    this.context.history.pushState(null, path);
  }

  render() {
    const currentClass = (this.props.isHeaderOption) ? 'header-options' : 'padList-control';
    const { editPad, deletePad } = this.state;
    return (
      <div className={currentClass}>
        <i className={classNames('icon-pencil', {'dn': ! editPad})} onClick={this.onClickEdit.bind(this)}></i>
        <i className={classNames('icon-trash', {'dn': ! deletePad})}></i>
      </div>
    );
  }
}

PadOptions.PropTypes = {
  isHeaderOption: PropTypes.bool.isRequired,
  padId: PropTypes.number,
  authState: PropTypes.object.isRequired,
  authorityInfo: PropTypes.object.isRequired
}
