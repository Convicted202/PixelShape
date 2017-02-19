import React, { Component } from 'react';
import ModalWindow from '../../modalwindow/Modalwindow';
import ToggleCheckbox from '../../togglecheckbox/Togglecheckbox';

class CustomizePanelModal extends Component {
  constructor (props) {
    super(props);
  }

  confirm () {
    this.props.closeModal();
  }

  cancel () {
    this.props.closeModal();
  }

  render () {
    return (
      <ModalWindow
        title="Customize panels"
        ok={{ text: 'Ok', action: this.confirm.bind(this) }}
        cancel={{ text: 'Cancel', action: this.cancel.bind(this) }}
        isShown={this.props.isShown}>

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
    );
  }
}

export default CustomizePanelModal;
