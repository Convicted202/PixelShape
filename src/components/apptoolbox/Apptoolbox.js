import './apptoolbox.styl';

import React, { Component } from 'react';
import AppToolButton from 'components/apptoolbutton/Apptoolbutton';
import ModalWindow from 'components/modalwindow/Modalwindow';
import ToggleCheckbox from 'components/togglecheckbox/Togglecheckbox';

import FileSaver from 'file-saver';

class Apptoolbox extends Component {

  constructor (...args) {
    super(...args);
    this.initialModalState = {
      newProjectShow: false,
      downloadProjectShow: false,
      customizePanelsShow: false,
      customizeSettingsShow: false
    };
    this.state = Object.assign({ resetPaletteFlag: false }, this.initialModalState);
  }

  setStateFlag (flag) {
    const newState = Object.assign({}, this.initialModalState);

    newState[flag] = true;
    this.setState(newState);
  }

  togglePaletteFlag () {
    this.setState({ resetPaletteFlag: !this.state.resetPaletteFlag });
  }

  downloadGIF () {
    const byteChars = this.props.framesOrder.map(el => this.props.gifFramesData[el]).join(''),
          len = byteChars.length,
          bytes = new Array(len);

    let i = 0, blob = null;

    for (; i < len; i++)
      bytes[i] = byteChars.charCodeAt(i);

    blob = new Blob([new Uint8Array(bytes)], {type: 'image/gif'});
    FileSaver.saveAs(blob, 'myGif.gif');
  }

  // RESET PROJECT callbacks start
  resetProject () {
    this.setStateFlag('newProjectShow');
  }

  resetProjectConfirm () {
    if (this.state.resetPaletteFlag) this.props.resetUserColors();
    this.props.resetFramesState();
    this.setState({ newProjectShow: false });
  }

  resetProjectCancel () {
    this.setState({ newProjectShow: false });
  }
  // RESET PROJECT callbacks end

  // SAVE PROJECT callbacks start
  downloadProject () {
    this.setStateFlag('downloadProjectShow');
  }

  downloadProjectConfirm () {
    this.downloadGIF();
    this.setState({ downloadProjectShow: false });
  }

  downloadProjectCancel () {
    this.setState({ downloadProjectShow: false });
  }
  // SAVE PROJECT callbacks end

  // CUSTOMIZE PANELS callbacks start
  customizePanels () {
    this.setStateFlag('customizePanelsShow');
  }

  customizePanelsCancel () {
    this.setState({ customizePanelsShow: false });
  }
  // CUSTOMIZE PANNELS callbacks end

  // CUSTOMIZE SETTINGS callbacks start
  customizeSettings () {
    this.setStateFlag('customizeSettingsShow');
  }

  customizeSettingsConfirm () {
    // this.props.setImageSize(this._widthInput.value, this._heightInput.value);
    this.setState({ customizeSettingsShow: false });
  }

  customizeSettingsCancel () {
    this.setState({ customizeSettingsShow: false });
  }
  // CUSTOMIZE SETTINGS callbacks end

  render () {
    return (
      <aside className="apptoolbox">
        <ul className="apptoolbox__buttons">
          <AppToolButton
            btnTooltip="New project"
            width="30" height="30" icon="new-project"
            doAction={this.resetProject.bind(this)} />
          <AppToolButton
            btnTooltip="Undo"
            width="30" height="30" icon="undo"
            doAction={() => {}} />
          <AppToolButton
            btnTooltip="Redo"
            width="30" height="30" icon="redo"
            doAction={() => {}} />
          <AppToolButton
            btnTooltip="Download"
            width="30" height="30" icon="download"
            doAction={this.downloadProject.bind(this)} />
          <AppToolButton
            btnTooltip="Panels"
            width="30" height="30" icon="panels"
            doAction={this.customizePanels.bind(this)} />
          <AppToolButton
            btnTooltip="Settings"
            width="30" height="30" icon="settings"
            doAction={this.customizeSettings.bind(this)} />
        </ul>

        <div className="modalContainer"></div>
        <ModalWindow
          title="New project"
          ok={{ text: 'Create', action: this.resetProjectConfirm.bind(this) }}
          cancel={{ text: 'Cancel', action: this.resetProjectCancel.bind(this) }}
          isShown={this.state.newProjectShow}>

          <ToggleCheckbox
            value={this.state.resetPaletteFlag}
            onChange={this.togglePaletteFlag.bind(this)}>Reset palette</ToggleCheckbox>
        </ModalWindow>

        <ModalWindow
          title="Download project"
          ok={{ text: 'Download', action: this.downloadProjectConfirm.bind(this) }}
          cancel={{ text: 'Cancel', action: this.downloadProjectCancel.bind(this) }}
          isShown={this.state.downloadProjectShow}>

          <ToggleCheckbox>Include spritesheet</ToggleCheckbox>
          <ToggleCheckbox>Include custom palette</ToggleCheckbox>

        </ModalWindow>

        <ModalWindow
          title="Customize panels"
          ok={{ text: 'Ok', action: this.customizePanelsCancel.bind(this) }}
          cancel={{ text: 'Cancel', action: this.customizePanelsCancel.bind(this) }}
          isShown={this.state.customizePanelsShow}>

          <ToggleCheckbox
            value={this.props.toolbarVisible}
            onChange={this.props.toggleToolbar.bind(this)}>Show toolbar</ToggleCheckbox>
          <ToggleCheckbox
            value={this.props.sidebarVisible}
            onChange={this.props.toggleSidebar.bind(this)}>Show sidebar</ToggleCheckbox>
          <ToggleCheckbox
            value={this.props.framebarVisible}
            onChange={this.props.toggleFramebar.bind(this)}>Show framebar</ToggleCheckbox>

        </ModalWindow>

        <ModalWindow
          title="Settings"
          ok={{ text: 'Save', action: this.customizeSettingsConfirm.bind(this) }}
          cancel={{ text: 'Cancel', action: this.customizeSettingsCancel.bind(this) }}
          isShown={this.state.customizeSettingsShow}>

          <div className="apptoolbox__dimensions">
            <div>
              <span className="apptoolbox__inputlabel">Width </span>
              <input
                className="apptoolbox__inputinline"
                ref={w => this._widthInput = w}
                defaultValue={this.props.imageSize.width} />
            </div>
            <div>
              <span className="apptoolbox__inputlabel">Height </span>
              <input
                className="apptoolbox__inputinline"
                ref={h => this._heightInput = h}
                defaultValue={this.props.imageSize.width} />
            </div>
          </div>
          <ToggleCheckbox
            value={this.props.gridShown}
            onChange={this.props.toggleGrid.bind(this)}>Show grid</ToggleCheckbox>

        </ModalWindow>
      </aside>
    );
  }
}

export default Apptoolbox;
