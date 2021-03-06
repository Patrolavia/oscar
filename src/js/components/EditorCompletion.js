import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { each } from 'lodash';

export default class EditorCompletion extends Component {

  constructor() {
    super();
    this.defaultState = {
      completion: []
    };
    this.state = this.defaultState;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        completion: nextProps.completion
      });
    }
  }

  onClickHandler(completion) {
    this.props.onClickCompletion(completion[0]);
  }

  renderCompletions() {
    const { type } = this.props;
    const { completion } = this.state;
    const completionRow = [];

    each(completion, (value, index) => {
      const isCooperatorType = type === 'cooperator';
      const completionObject = (isCooperatorType) ? { name: value.name, id: value.id } : value;
      completionRow.push(
        <span key={ index } className="editPad-completion" onClick={ this.onClickHandler.bind(this, completion) }>
          { isCooperatorType && <img src={ value.image } /> }
          <span>{ isCooperatorType && completionObject.name || completionObject }</span>
        </span>
      );
    }, this);

    return completionRow;
  }

  render() {
    const { type } = this.props;
    return (
      <div className={classNames('editPad-completions', {'editPad-completions--tag': type === 'tags'})}>
        { this.renderCompletions() }
      </div>
    );
  }
}

EditorCompletion.propTypes = {
  type: PropTypes.string.isRequired,
  completion: PropTypes.array.isRequired,
  onClickCompletion: PropTypes.func.isRequired
};
