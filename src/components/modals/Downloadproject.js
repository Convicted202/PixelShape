import React, { Component } from 'react';
import ModalWindow from '../modalwindow/Modalwindow';
import ToggleCheckbox from '../togglecheckbox/Togglecheckbox';

import Downloader from '../../fileloaders/Downloader';

class DownloadProjectModal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      includeProject: true
    };
  }

  includeProjectToggle () {
    this.setState({
      includeProject: !this.state.includeProject
    });
  }

  combineGifData () {
    return this.props.framesOrder.map(
      el => this.props.gifFramesData[el]
    ).join('');
  }

  confirm () {
    const combinedData = this.combineGifData();
    Downloader.asGIF(combinedData);
    if (this.state.includeProject) this.props.downloadProject('project.pxlsh');
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
        <ToggleCheckbox
          value={this.state.includeProject}
          onChange={this.includeProjectToggle.bind(this)}>Include project</ToggleCheckbox>

      </ModalWindow>
    );
  }
}

export default DownloadProjectModal;
