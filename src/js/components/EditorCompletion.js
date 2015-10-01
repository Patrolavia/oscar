import React, { Component, PropTypes } from 'react';
import { each } from 'lodash';

export default class EditorCompletion extends Component {

  constructor() {
    super();
    this.defaultState = {
      completion: []
    }
    this.state = this.defaultState;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        completion: nextProps.completion
      })
    }
  }

  onClickHandler(args) {
    this.props.onClickCompletion(args);
  }

  renderCompletions() {
    const { completion } = this.state;
    const completionRow = [];
    each(completion, (value, index) => {
      const { name, image } = value;
      completionRow.push(
        <span key={index} className="editPad-completion" onClick={this.onClickHandler.bind(this, {userName: name, user: value})}>
          <img src={image} />
          <span>{name}</span>
        </span>
      )
    }, this)

    return completionRow;
  }

  render() {
    return (
      <div className="editPad-completions">
        { this.renderCompletions() }
      </div>
    );
  }
}

EditorCompletion.propTypes = {
  completion: PropTypes.array.isRequired,
  onClickCompletion: PropTypes.func.isRequired
};
