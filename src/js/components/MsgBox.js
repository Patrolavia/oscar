import React, { Component, PropTypes } from 'react';
import g11n from 'untils/g11n';

export default class MsgBox extends Component {
  render() {
    const state = this.props.state;
    return (
      <div className="msgbox">
        <span className="msgbox-title">{ g11n.t('msg')[state].title }</span>
        <span className="msgbox-msg">{ g11n.t('msg')[state].msg }</span>
      </div>
    );
  }
}

MsgBox.propTypes = {
  state: PropTypes.string.isRequired
};
