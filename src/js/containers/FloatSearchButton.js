import React, { Component } from 'react';

export default class FloatSearchButton extends Component {

  onClickHandler() {
    if (document.querySelector('.icon-search').classList.length === 1) {
      document.querySelector('.icon-search').click();
    } else {
      document.querySelector('.toolbar-searchBtn.cancel').click();
    }
  }

  render() {
    return (
      <div className="container-floatBtn--search" onClick={this.onClickHandler.bind(this)}>
        <i className="icon-search"></i>
      </div>
    )
  }
}
