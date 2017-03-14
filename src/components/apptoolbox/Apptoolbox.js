import './apptoolbox.styl';

import React, { Component } from 'react';
import decorateWithKeyBindings from '../../helpers/KeyBindings';

import AppToolButton from '../apptoolbutton/Apptoolbutton';

import NewProjectModal from '../../containers/modals/Newproject';
import DownloadProjectModal from '../../containers/modals/Downloadproject';
import CustomizePanelsModal from '../../containers/modals/Customizepanels';
import SettingsModal from '../../containers/modals/Settings';

const MODALS = {
  NewProject: 'newProjectShow',
  DownloadProject: 'downloadProjectShow',
  CustomizePanels: 'customizePanelsShow',
  Settings: 'settingsShow'
};

class Apptoolbox extends Component {

  constructor (...args) {
    super(...args);
    this.initialModalState = {
      [MODALS.NewProject]: false,
      [MODALS.DownloadProject]: false,
      [MODALS.CustomizePanels]: false,
      [MODALS.Settings]: false
    };
    this.state = Object.assign({}, this.initialModalState);

    this.executeUndo = this.executeUndo.bind(this);
    this.executeRedo = this.executeRedo.bind(this);
    this.openNewProject = this.openModal.bind(this, MODALS.NewProject);
    this.openDownloadProject = this.openModal.bind(this, MODALS.DownloadProject);
    this.openCustomizePanels = this.openModal.bind(this, MODALS.CustomizePanels);
    this.openSettings = this.openModal.bind(this, MODALS.Settings);

    this.closeModal = this.closeModal.bind(this);

    this.bindKeys({
      'ctrl + z': this.executeUndo,
      'ctrl + y': this.executeRedo,
      'alt + n': this.openNewProject,
      'alt + d': this.openDownloadProject,
      'alt + p': this.openCustomizePanels,
      'alt + s': this.openSettings,
      'esc': this.closeModal
    });
  }

  setStateFlag (flag) {
    const newState = Object.assign({}, this.initialModalState);

    newState[flag] = true;
    this.setState(newState);
  }

  unsetState () {
    const newState = Object.assign({}, this.initialModalState);

    this.setState(newState);
  }

  openModal (modal) {
    this.setStateFlag(modal);
  }

  closeModal () {
    this.unsetState();
  }

  executeUndo () {
    if (this.props.canUndo) this.props.undo();
  }

  executeRedo () {
    if (this.props.canRedo) this.props.redo();
  }

  render () {
    return (
      <aside className="apptoolbox">
        <ul className="apptoolbox__buttons">
          <AppToolButton
            btnTooltip="New project"
            btnShortcut="(ALT + N)"
            width="30" height="30" icon="new-project"
            doAction={this.openNewProject} />
          <AppToolButton
            btnTooltip="Undo"
            btnShortcut="(CTRL + Z)"
            disabled={!this.props.canUndo}
            width="30" height="30" icon="undo"
            doAction={this.executeUndo} />
          <AppToolButton
            btnTooltip="Redo"
            btnShortcut="(CTRL + Y)"
            disabled={!this.props.canRedo}
            width="30" height="30" icon="redo"
            doAction={this.executeRedo} />
          <AppToolButton
            btnTooltip="Download"
            btnShortcut="(ALT + D)"
            width="30" height="30" icon="download"
            doAction={this.openDownloadProject} />
          <AppToolButton
            btnTooltip="Panels"
            btnShortcut="(ALT + P)"
            width="30" height="30" icon="panels"
            doAction={this.openCustomizePanels} />
          <AppToolButton
            btnTooltip="Settings"
            btnShortcut="(ALT + S)"
            width="30" height="30" icon="settings"
            doAction={this.openSettings} />
        </ul>

        <div
          className="modalLayer"
          style={{
            display: this.state.newProjectShow || this.state.downloadProjectShow || this.state.customizePanelsShow || this.state.settingsShow ? 'block' : 'none'
          }}></div>

        <NewProjectModal
          isShown={this.state.newProjectShow}
          closeModal={this.closeModal} />

        <DownloadProjectModal
          isShown={this.state.downloadProjectShow}
          closeModal={this.closeModal} />

        <CustomizePanelsModal
          isShown={this.state.customizePanelsShow}
          closeModal={this.closeModal} />

        <SettingsModal
          isShown={this.state.settingsShow}
          closeModal={this.closeModal} />
      </aside>
    );
  }
}

export default decorateWithKeyBindings(Apptoolbox);
