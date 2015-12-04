import React, { Component, PropTypes } from 'react';
import Markdown from 'react-markdown-el';
import g11n from 'utils/g11n';

export default class EditorPreview extends Component {
  render() {
    return (
      <section className="editPad-preview">
        <h1 className="editPad-previewTitle">{ g11n.t('editor.button.preview') }</h1>
        <Markdown text={ this.props.content } />
      </section>
    );
  }
}

EditorPreview.propTypes = {
  content: PropTypes.string.isRequired
};
