import React, { Component } from 'react';
import ModalWindow from 'components/modalwindow/Modalwindow';
import ToggleCheckbox from 'components/togglecheckbox/Togglecheckbox';

import StateManager from 'fileloaders/StateManager';

import './newproject.styl';

class NewProjectModal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      importedFileName: null
    };
  }

  onFileLoaded (data) {
    this.setState({ importedFileName: data.file.name });
  }

  handleUpload () {
    const files = this._input.files;

    StateManager.upload(files[0], this.onFileLoaded.bind(this));
  }

  getFileNotification () {
    if (this.state.importedFileName) {
      return (
        <p className="newproject-import__info-file">{ this.state.importedFileName }</p>
      );
    }

    return [
      <p key="info" className="newproject-import__info-row">No file imported.</p>,
      <p key="note" className="newproject-import__info-row newproject-import__info-row__note">New project will be created.</p>
    ];
  }

  confirm () {
    if (this.props.resetPaletteOn) this.props.resetUserColors();
    this.props.resetFramesState();
    this.props.closeModal();
  }

  cancel () {
    this.setState({ importedFileName: null });
    this._input.value = '';
    this.props.closeModal();
  }

  render () {
    return (
      <ModalWindow
        title="New project"
        ok={{ text: 'Create', action: this.confirm.bind(this) }}
        cancel={{ text: 'Cancel', action: this.cancel.bind(this) }}
        isShown={this.props.isShown}>

        <ToggleCheckbox
          value={this.props.resetPaletteOn}
          onChange={this.props.toggleResetPalette.bind(this)}>Reset palette</ToggleCheckbox>

        <div className="newproject-import">
          <div className="newproject-import__upload">
            <input
              id="project-import"
              type="file"
              accept=".pxlsh"
              ref={input => this._input = input}
              style={{ display: 'none' }}
              onChange={this.handleUpload.bind(this)} />
            <label htmlFor="project-import" className="newproject-import__upload-btn">
              Import
              <svg className="newproject-import__upload-btn__icon" viewBox="0 0 24 24" width="24" height="24">
                <use xlinkHref={'#upload'}></use>
              </svg>
            </label>
          </div>

          <div className="newproject-import__info">
            { this.getFileNotification() }
          </div>
        </div>
      </ModalWindow>
    );
  }
}

export default NewProjectModal;
