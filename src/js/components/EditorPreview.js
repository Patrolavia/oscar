import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Markdown from 'react-remarkable';
import { forEach } from 'lodash';
import 'vendor/prettify/prettify';

export default class EditorPreview extends Component {
  componentDidMount() {
    this.codePrettyPrint();
  }

  componentDidUpdate() {
    this.codePrettyPrint();
  }

  codePrettyPrint() {
    const previewContent = findDOMNode(this.refs.previewContent);
    const preNode = previewContent.querySelectorAll('pre');
    forEach(preNode, (el) => {
      el.classList.add('prettyprint', 'linenums');
    });
    prettyPrint();
  }

  render() {
    return (
      <section className="editPad-preview" ref="previewContent">
        <h1 className="editPad-previewTitle">Preview</h1>
        <Markdown source={ this.props.content } />
      </section>
    );
  }
}

EditorPreview.propTypes = {
  content: PropTypes.string.isRequired
};

