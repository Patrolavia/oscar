import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { indexOf, union } from 'lodash';

export default class PadOptions extends Component {
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

  render() {
    const currentClass = (this.props.isHeaderOption) ? 'header-options' : 'padList-control';
    const { editPad, deletePad } = this.state;
    return (
      <div className={currentClass}>
        { editPad && <i className="icon-pencil"></i> }
        { deletePad && <i className="icon-trash"></i> }
      </div>
    );
  }
}

PadOptions.PropTypes = {
  isHeaderOption: PropTypes.bool,
  authState: PropTypes.object,
  authorityInfo: PropTypes.object
}
