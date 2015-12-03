import React, { Component, PropTypes } from 'react';
import Markdown from 'react-markdown-el';

export default class EditorPreview extends Component {
  render() {
    return (
      <section className="editPad-preview">
        <h1 className="editPad-previewTitle">Preview</h1>
        <Markdown text={ this.props.content } />
      </section>
    );
  }
}

EditorPreview.propTypes = {
  content: PropTypes.string.isRequired
};

