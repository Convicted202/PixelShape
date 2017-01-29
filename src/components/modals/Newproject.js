import React, { Component } from 'react';
import ModalWindow from 'components/modalwindow/Modalwindow';
import ToggleCheckbox from 'components/togglecheckbox/Togglecheckbox';

class NewProjectModal extends Component {
  constructor (props) {
    super(props);
  }

  confirm () {
    if (this.props.resetPaletteOn) this.props.resetUserColors();
    this.props.resetFramesState();
    this.props.closeModal();
  }

  cancel () {
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
      </ModalWindow>
    );
  }
}

export default NewProjectModal;
