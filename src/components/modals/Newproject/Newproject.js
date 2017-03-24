import React, { Component } from 'react';
import ModalWindow from '../../modalwindow/Modalwindow';
import ToggleCheckbox from '../../togglecheckbox/Togglecheckbox';

import StateLoader from '../../../statemanager/StateLoader';
import { projectExtension } from '../../../defaults/constants';

import './newproject.styl';

class NewProjectModal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      importedFileName: null,
      importedData: null,
      loading: false,
      progress: 0
    };
  }

  onFileLoaded (data) {
    this.setState({
      importedFileName: data.file.name,
      importedData: data.json,
      loading: false,
      progress: 0
    });
  }

  onStep (current, total) {
    this.setState({
      progress: Math.round(100 * current / total)
    });
  }

  startLoading () {
    this.setState({
      loading: true
    });
  }

  handleUpload () {
    const file = this._input.files[0],
          callback = this.onFileLoaded.bind(this),
          stepCallback = this.onStep.bind(this);

    // IE11 fix
    if (!file) return;

    this.startLoading();
    if (file.type.match(/image\/gif/)) StateLoader.uploadGif(file, callback, stepCallback);
    if (file.name.match(projectExtension)) StateLoader.upload(file, callback);
  }

  getFileNotification () {
    if (this.state.importedFileName) {
      return (
        <p className="newproject-import__info-file">{ this.state.importedFileName }</p>
      );
    }

    if (this.state.loading) return this.getFileLoadingTracking();

    return [
      <p key="info" className="newproject-import__info-row">No file imported.</p>,
      <p key="note" className="newproject-import__info-row newproject-import__info-row__note">New project will be created.</p>
    ];
  }

  getFileLoadingTracking () {
    return [
      <div key="spinner" className="newproject-import__info-spinner"></div>,
      <div key="tracking" className="newproject-import__info-tracking">{`${this.state.progress}%`}</div>
    ];
  }

  dropImportedFile () {
    this.setState({
      importedFileName: null,
      importedData: null
    });
    this._input.value = '';
  }

  confirm () {
    if (this.state.importedData)
      this.props.uploadProject(this.state.importedData);
    else {
      if (this.props.resetPaletteOn) this.props.resetUserColors();
      this.props.resetFramesState();
    }
    this.dropImportedFile();
    this.props.closeModal();
  }

  cancel () {
    this.dropImportedFile();
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
          onChange={this.props.toggleResetPalette.bind(this)}>
          Reset palette
        </ToggleCheckbox>

        <div className="newproject-import">
          <div className="newproject-import__upload">
            <input
              id="project-import"
              type="file"
              accept={[projectExtension, '.gif'].join()}
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

        <div className="newproject-import__warning">You are allowed to load only files of <strong>.gif</strong> and <strong>.pxlsh</strong> formats</div>
      </ModalWindow>
    );
  }
}

export default NewProjectModal;
