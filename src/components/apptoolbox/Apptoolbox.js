import './apptoolbox.styl';

import React, { Component } from 'react';
import AppToolButton from 'components/apptoolbutton/AppToolButton';
import ModalWindow from 'components/modalwindow/ModalWindow';

import FileSaver from 'file-saver';

class Apptoolbox extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      newProjectShow: false,
      downloadProjectShow: false,
      customizeSettingsShow: false
    }
  }

  downloadGIF() {
    const byteChars = this.props.gifFramesArray.join(''),
          len = byteChars.length,
          bytes = new Array(len);

    let i = 0, blob = null;

    for (; i < len; i++) {
        bytes[i] = byteChars.charCodeAt(i);
    }

    blob = new Blob([new Uint8Array(bytes)], {type: 'image/gif'});
    FileSaver.saveAs(blob, 'myGif.gif');
  }

  // RESET PROJECT callbacks start
  resetProject() {
    this.setState({ newProjectShow: true });
  }

  resetProjectConfirm() {
    this.props.resetFramesState();
    this.props.addFrame();
    this.setState({ newProjectShow: false });
  }

  resetProjectCancel() {
    this.setState({ newProjectShow: false });
  }
  // RESET PROJECT callbacks end

  // SAVE PROJECT callbacks start
  downloadProject() {
    this.setState({ downloadProjectShow: true });
  }

  downloadProjectConfirm() {
    this.downloadGIF();
    this.setState({ downloadProjectShow: false });
  }

  downloadProjectCancel() {
    this.setState({ downloadProjectShow: false });
  }
  // SAVE PROJECT callbacks end

  // CUSTOMIZE SETTINGS callbacks start
  customizeSettings() {
    this.setState({ customizeSettingsShow: true })
  }

  customizeSettingsConfirm() {
    this.setState({ customizeSettingsShow: false });
  }

  customizeSettingsCancel() {
    this.setState({ customizeSettingsShow: false })
  }
  // CUSTOMIZE SETTINGS callbacks end

  render() {
    return (
      <aside className="apptoolbox">
        <ul className="apptoolbox__buttons">
          <AppToolButton
            width="30" height="30" icon="new-project"
            doAction={this.resetProject.bind(this)} />
          <AppToolButton
            width="30" height="30" icon="undo"
            doAction={() => {}} />
          <AppToolButton
            width="30" height="30" icon="redo"
            doAction={() => {}} />
          <AppToolButton
            width="30" height="30" icon="download"
            doAction={this.downloadProject.bind(this)} />
          <AppToolButton
            width="30" height="30" icon="settings"
            doAction={this.customizeSettings.bind(this)} />
        </ul>

        <ModalWindow
          title="New project"
          ok={{ text: 'Create', action: this.resetProjectConfirm.bind(this) }}
          cancel={{ text: 'Cancel', action: this.resetProjectCancel.bind(this) }}
          isShown={this.state.newProjectShow}>

          <input className="switch" type="checkbox" defaultValue="off" />
          <span>Reset palette (not working yet)</span>
        </ModalWindow>

        <ModalWindow
          title="Download project"
          ok={{ text: 'Download', action: this.downloadProjectConfirm.bind(this) }}
          cancel={{ text: 'Cancel', action: this.downloadProjectCancel.bind(this) }}
          isShown={this.state.downloadProjectShow}>

        </ModalWindow>

        <ModalWindow
          title="Settings"
          ok={{ text: 'Save', action: this.customizeSettingsConfirm.bind(this) }}
          cancel={{ text: 'Cancel', action: this.customizeSettingsCancel.bind(this) }}
          isShown={this.state.customizeSettingsShow}>

        </ModalWindow>
      </aside>
    )
  }
}

export default Apptoolbox;
