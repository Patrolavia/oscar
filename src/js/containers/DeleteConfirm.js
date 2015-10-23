import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { fetchPads, initDeleteForm, deletePad, deleteCancel } from 'actions';

export default class DeleteConfirm extends Component {

  static contextTypes = {
      history: PropTypes.object
  };

  constructor() {
    super();
    this.defaultState = {
      isRequesting: false,
      isActive: false,
      message: null
    }
    this.state = this.defaultState;
  }

  componentWillReceiveProps(nextProps) {
    const { isActive, result, message, isRequesting } = nextProps.deleteState;
    this.setState({
      isActive: isActive
    })

    if (result) {
      this.context.history.pushState(null, '/');
      this.onClickCancel();
      this.props.fetchPads();
    } else {
      const newState = {
        isRequesting: isRequesting
      };
      if (! isRequesting) {
        newState.message = message
      }
      this.setState(newState);
    }
  }

  onClickDelete() {
    this.setState({message: ''});
    const { deleteState: { padInfo }, deletePad } = this.props;
    if (padInfo.padTitle === findDOMNode(this.refs.titleInput).value) {
      deletePad({ padId: padInfo.padId });
    } else {
      this.setState({message: 'value invalid.'});
    }
  }

  onClickCancel() {
    this.props.deleteCancel();
    this.setState(this.defaultState);
    findDOMNode(this.refs.titleInput).value = '';
  }

  render() {
    return (
      <div className={classNames('deleteConfirm', {'dn': ! this.state.isActive})}>
        <div className="deleteConfirm-wrapper">
          <div className="deleteConfirm-content">
            <span className="deleteConfirm-title">Are you sure?</span>
            <p className="deleteConfirm-discribe">To contiune, please type in the name of the pad to confirm. </p>
            <input className="deleteConfirm-input"
              type="text"
              ref="titleInput"/>
          </div>
          <div className="deleteConfirm-submit">
            <a className={classNames('button-wb', 'button', {'delete': ! this.state.isRequesting})}
              disabled={this.state.isRequesting}
              onClick={this.onClickDelete.bind(this)}>
              { this.state.isRequesting && 'Deleting...' || 'Delete this pad' }
            </a>
            <a className="button-wb button cancel" onClick={this.onClickCancel.bind(this)}>Cancel</a>
          </div>
          <div className={classNames('deleteConfirm-errorMsg', {'dn': ! this.state.message})}>
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
  initDeleteForm: PropTypes.func.isRequired,
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
  { fetchPads, initDeleteForm, deletePad, deleteCancel }
)(DeleteConfirm);
