import React, { Component } from 'react';
import ModalWindow from 'components/modalwindow/Modalwindow';
import ToggleCheckbox from 'components/togglecheckbox/Togglecheckbox';
import CanvasAnchors from 'containers/canvasanchors/Canvasanchors';

// TODO: take styles from apptoolbox and push in separate related stylesheets

const maxVal = 600,
      errorColor = '#9a1000',
      regularColor = '#eee';

class SettingsModal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      widthError: false,
      heightError: false
    };
  }

  resetErrors () {
    this.setState({
      widthError: false,
      heightError: false
    });
  }

  isInputValid (input) {
    return input.value <= maxVal;
  }

  checkErrors () {
    let ok = false;

    if (!this.isInputValid(this._widthInput)) {
      this.setState({ widthError: true });
      ok = true;
    }
    if (!this.isInputValid(this._heightInput)) {
      this.setState({ heightError: true });
      ok = true;
    }
    return ok;
  }

  getErrorMessage () {
    if (this.state.widthError || this.state.heightError) {
      return (
        <span className="apptoolbox__dimensions-inputs-error">Sorry, max allowed value is 600</span>
      );
    }
    return null;
  }

  setActualInputValues () {
    this._widthInput.value = this.props.imageSize.width;
    this._heightInput.value = this.props.imageSize.height;
  }

  confirm () {
    this.resetErrors();
    if (this.checkErrors()) return;
    this.props.setImageSize(this._widthInput.value, this._heightInput.value, this.props.stretchOn);
    this.props.closeModal();
  }

  cancel () {
    this.setActualInputValues();
    this.resetErrors();
    this.props.closeModal();
  }

  getInputs () {
    return [
      <div key="width">
        <span className="apptoolbox__inputlabel">Width </span>
        <input
          className="apptoolbox__inputinline"
          ref={w => this._widthInput = w}
          key={this.props.imageSize.width}
          style={{ borderColor: this.state.widthError ? errorColor : regularColor }}
          defaultValue={this.props.imageSize.width} />
      </div>,

      <div key="height">
        <span className="apptoolbox__inputlabel">Height </span>
        <input
          className="apptoolbox__inputinline"
          ref={h => this._heightInput = h}
          key={this.props.imageSize.height}
          style={{ borderColor: this.state.heightError ? errorColor : regularColor }}
          defaultValue={this.props.imageSize.width} />
      </div>
    ];
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
              { this.getInputs() }
              { this.getErrorMessage() }
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
