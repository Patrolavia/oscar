import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { indexOf, union } from 'lodash';
import classNames from 'classnames';
import { initDeleteForm } from 'actions';

export default class PadOptions extends Component {
  static contextTypes = {
      history: PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      editPad: false,
      deletePad: false
    };
  }

  componentDidMount() {
    this.checkAthority(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkAthority(nextProps);
  }

  onClickEdit() {
    const path = '/edit/' + this.props.padData.id;
    this.context.history.pushState(null, path);
  }

  onClickDelete() {
    const { id, title } = this.props.padData;
    this.props.initDeleteForm({
      padId: id,
      padTitle: title
    });
  }

  checkAthority(props) {
    const { authState: { result: isLogged, data: { id: userId } }, authorityInfo: { ownerId, cooperatorList } } = props;
    const newState = {};
    if (isLogged) {
      newState.editPad = indexOf(union([ownerId], cooperatorList), userId) >= 0;
      newState.deletePad = (userId === ownerId);
    }
    this.setState(newState);
  }

  render() {
    const currentClass = (this.props.isHeaderOption) ? 'header-options' : 'padList-control';
    const { editPad, deletePad } = this.state;
    return (
      <div className={currentClass}>
        <i className={classNames('icon-pencil', {'dn': !editPad})} onClick={this.onClickEdit.bind(this)}></i>
        <i className={classNames('icon-trash', {'dn': !deletePad})} onClick={this.onClickDelete.bind(this)}></i>
      </div>
    );
  }
}

PadOptions.propTypes = {
  isHeaderOption: PropTypes.bool.isRequired,
  padData: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.title
  }),
  authorityInfo: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,

  initDeleteForm: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  return {
    authState: state.auth
  };
}

export default connect(
  mapStateToProps,
  { initDeleteForm }
)(PadOptions);
