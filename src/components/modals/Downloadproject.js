import React, { Component } from 'react';
import ModalWindow from 'components/modalwindow/Modalwindow';
import ToggleCheckbox from 'components/togglecheckbox/Togglecheckbox';

import FileSaver from 'file-saver';

class DownloadProjectModal extends Component {
  constructor (props) {
    super(props);
  }

  downloadGIF () {
    const byteChars = this.props.framesOrder.map(el => this.props.gifFramesData[el]).join(''),
          len = byteChars.length,
          bytes = new Array(len);

    let i = 0, blob = null;

    for (; i < len; i++)
      bytes[i] = byteChars.charCodeAt(i);

    blob = new Blob([new Uint8Array(bytes)], { type: 'image/gif' });
    FileSaver.saveAs(blob, 'myGif.gif');
  }

  confirm () {
    this.downloadGIF();
    this.props.closeModal();
  }

  cancel () {
    this.props.closeModal();
  }

  render () {
    return (
      <ModalWindow
        title="Download project"
        ok={{ text: 'Download', action: this.confirm.bind(this) }}
        cancel={{ text: 'Cancel', action: this.cancel.bind(this) }}
        isShown={this.props.isShown}>

        <ToggleCheckbox>Include spritesheet</ToggleCheckbox>
        <ToggleCheckbox>Include custom palette</ToggleCheckbox>

      </ModalWindow>
    );
  }
}

export default DownloadProjectModal;
