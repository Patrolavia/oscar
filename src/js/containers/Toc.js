import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { forEach } from 'lodash';
import classNames from 'classnames';

export default class Toc extends Component {
  static contextTypes = {
    history: PropTypes.object
  };

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  renderToc() {
    const tocNodes = [];
    forEach(this.props.toc, (el, index) => {
      const href = '#' + el.id;
      const tierClass = 'tier' + el.tagName.match(/H([1-3])/)[1];
      tocNodes.push(
        <a key={index} className={classNames('toc-listItem', tierClass)} href={href}>{ el.innerHTML }</a>
      );
    });

    return tocNodes;
  }

  render() {
    return (
      <div className="toc" ref="tocWrapper">
        <div className="toc-list">
          { this.renderToc() }
        </div>
      </div>
    );
  }
}

Toc.propTypes = {
  toc: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    toc: state.pad.toc,
    location: state.router.location
  };
}

export default connect(
  mapStateToProps
)(Toc);
