import React, { Component } from "react";
import ReactQuill from "react-quill";
import merge from "lodash/merge";

class NoteShowEditor extends Component {
  constructor(props) {
    super(props);
    if (props.note) {
      this.state = {
        body: props.note.body,
        title: props.note.title
      };
    } else {
      this.state = {
        body: "",
        title: ""
      };
    }

    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.note) {
      return;
    }

    if (
      (!prevProps.note && this.props.note) ||
      (prevProps.note &&
        (prevProps.note.title !== this.props.note.title ||
          prevProps.note.body) !== this.props.note.body)
    ) {
      this.setState({
        body: this.props.note.body,
        title: this.props.note.title
      });
    }
  }

  handleEditorChange(value) {
    this.setState({ body: value });
  }

  saveNote(e) {
    e.preventDefault();
    let updatedNote = merge({}, this.props.note, {
      body: this.state.body,
      title: this.state.title
    });

    this.props.updateNote(updatedNote);
  }

  handleTitleChange(e) {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  render() {
    return (
      <div className="note-show-editor-wrapper">
        <div className="note-show-editor-title-row">
          <input
            type="text"
            className="note-show-editor-title"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
          <button
            onClick={this.saveNote}
            className="confirm-delete-modal-submit-button note-show-save-button"
          >
            Save
          </button>
        </div>
        <ReactQuill
          className="note-show-quill"
          value={this.state.body}
          onChange={this.handleEditorChange}
        />
      </div>
    );
  }
}

export default NoteShowEditor;
