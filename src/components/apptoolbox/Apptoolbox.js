import './apptoolbox.styl';

import React, { Component } from 'react';
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
            width="30" height="30" icon="new-project"
            doAction={this.openModal.bind(this, MODALS.NewProject)} />
          <AppToolButton
            btnTooltip="Undo"
            disabled={!this.props.canUndo}
            width="30" height="30" icon="undo"
            doAction={this.executeUndo.bind(this)} />
          <AppToolButton
            btnTooltip="Redo"
            disabled={!this.props.canRedo}
            width="30" height="30" icon="redo"
            doAction={this.executeRedo.bind(this)} />
          <AppToolButton
            btnTooltip="Download"
            width="30" height="30" icon="download"
            doAction={this.openModal.bind(this, MODALS.DownloadProject)} />
          <AppToolButton
            btnTooltip="Panels"
            width="30" height="30" icon="panels"
            doAction={this.openModal.bind(this, MODALS.CustomizePanels)} />
          <AppToolButton
            btnTooltip="Settings"
            width="30" height="30" icon="settings"
            doAction={this.openModal.bind(this, MODALS.Settings)} />
        </ul>

        <div
          className="modalLayer"
          style={{
            display: this.state.newProjectShow || this.state.downloadProjectShow || this.state.customizePanelsShow || this.state.settingsShow ? 'block' : 'none'
          }}></div>

        <NewProjectModal
          isShown={this.state.newProjectShow}
          closeModal={this.closeModal.bind(this)} />

        <DownloadProjectModal
          isShown={this.state.downloadProjectShow}
          closeModal={this.closeModal.bind(this)} />

        <CustomizePanelsModal
          isShown={this.state.customizePanelsShow}
          closeModal={this.closeModal.bind(this)} />

        <SettingsModal
          isShown={this.state.settingsShow}
          closeModal={this.closeModal.bind(this)} />
      </aside>
    );
  }
}

export default Apptoolbox;
