import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { fetchPads, deletePad, deleteCancel } from 'actions';
import g11n from 'utils/g11n';

export default class DeleteConfirm extends Component {

  static contextTypes = {
      history: PropTypes.object
  };

  constructor() {
    super();
    this.defaultState = {
      isClicked: false,
      isRequesting: false,
      isActive: false,
      message: ''
    };
    this.state = this.defaultState;
  }

  componentWillReceiveProps(nextProps) {
    const { isActive, result, isRequesting, data } = nextProps.deleteState;
    this.setState({
      isActive: isActive
    });

    if (result) {
      this.context.history.pushState(null, '/');
      this.onClickCancel();
      this.props.fetchPads();
    } else {
      const newState = {
        isRequesting: isRequesting
      };
      if (isRequesting) {
        newState.message = g11n.t('delete.requesting');
      } else {
        newState.message = (data) ? g11n.t('delete.error')[data.code] : '' ;
      }
      this.setState(newState);
    }
  }

  onClickDelete() {
    const { deleteState: { padInfo } } = this.props;
    if (padInfo.padTitle === findDOMNode(this.refs.titleInput).value) {
      this.props.deletePad({ padId: padInfo.padId });
    } else {
      this.setState({message: g11n.t('delete.valueInvaild')})
    }
  }

  onClickCancel() {
    this.props.deleteCancel();
    this.setState(this.defaultState);
    findDOMNode(this.refs.titleInput).value = '';
  }

  onChangeInput() {
    this.setState({message: ''});
  }

  render() {
    const { result, errorStatus } = this.props.deleteState;
    return (
      <div className={classNames('deleteConfirm', {'dn': !this.state.isActive})}>
        <div className="deleteConfirm-wrapper">
          <div className="deleteConfirm-content">
            <span className="deleteConfirm-title">{ g11n.t('delete.form.title') }</span>
            <p className="deleteConfirm-discribe">{ g11n.t('delete.form.describe') }</p>
            <input className="deleteConfirm-input"
              onChange={this.onChangeInput.bind(this)}
              type="text"
              ref="titleInput"/>
          </div>
          <div className="deleteConfirm-submit">
            <a className={classNames('button-wb', 'button', {'delete': !this.state.isRequesting})}
              disabled={this.state.isRequesting}
              onClick={this.onClickDelete.bind(this)}>
              { this.state.isRequesting && g11n.t('delete.button.deleting') || g11n.t('delete.button.delete') }
            </a>
            <a className="button-wb button cancel" onClick={this.onClickCancel.bind(this)}>{ g11n.t('general.button.cancel') }</a>
          </div>
          <div className={classNames('deleteConfirm-errorMsg', {'dn': !this.state.message.length })}>
            <span>{ this.state.message }</span>
          </div>
        </div>
      </div>
    );
  }
}

DeleteConfirm.propTypes = {
  deleteState: PropTypes.object.isRequired,

  fetchPads: PropTypes.func.isRequired,
  deletePad: PropTypes.func.isRequired,
  deleteCancel: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    deleteState: state.del
  };
}

export default connect(
  mapStateToProps,
  { fetchPads, deletePad, deleteCancel }
)(DeleteConfirm);
