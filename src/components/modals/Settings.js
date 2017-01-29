import React, { Component } from 'react';
import ModalWindow from 'components/modalwindow/Modalwindow';
import ToggleCheckbox from 'components/togglecheckbox/Togglecheckbox';
import CanvasAnchors from 'containers/canvasanchors/Canvasanchors';

class SettingsModal extends Component {
  constructor (props) {
    super(props);
  }

  confirm () {
    this.props.setImageSize(this._widthInput.value, this._heightInput.value, this.props.stretchOn);
    this.props.closeModal();
  }

  cancel () {
    this.props.closeModal();
  }

  render () {
    return (
      <ModalWindow
        title="Settings"
        ok={{ text: 'Save', action: this.confirm.bind(this) }}
        cancel={{ text: 'Cancel', action: this.cancel.bind(this) }}
        isShown={this.props.isShown}>

        <div className="apptoolbox__dimensions">
          <div className="apptoolbox__dimensions-edit">
            <div className="apptoolbox__dimensions-inputs">
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
              className="apptoolbox__dimensions-edit__ratio"
              value={false}
              onChange={() => {}}>Keep ratio</ToggleCheckbox>
          </div>
          <div className="apptoolbox__dimensions-modifiers">
            <CanvasAnchors
              className="apptoolbox__dimensions-modifiers__anchors"
              disabled={this.props.stretchOn} />
            <ToggleCheckbox
              className="apptoolbox__dimensions-modifiers__stretch"
              value={this.props.stretchOn}
              onChange={this.props.toggleStretch.bind(this)}>Stretch</ToggleCheckbox>
          </div>
        </div>
        <ToggleCheckbox
          value={this.props.gridShown}
          onChange={this.props.toggleGrid.bind(this)}>Show grid</ToggleCheckbox>

      </ModalWindow>
    );
  }
}

export default SettingsModal;
