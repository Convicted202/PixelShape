import React, { Component } from 'react';
import ModalWindow from '../modalwindow/Modalwindow';
import ToggleCheckbox from '../togglecheckbox/Togglecheckbox';

import Downloader from '../../fileloaders/Downloader';
import { combineImageDataToCanvas } from '../../utils/canvasUtils';

class DownloadProjectModal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      includeProject: true,
      includeSpritesheet: true
    };
  }

  includeProjectToggle () {
    this.setState({
      includeProject: !this.state.includeProject
    });
  }

  includeSpritesheetToggle () {
    this.setState({
      includeSpritesheet: !this.state.includeSpritesheet
    });
  }

  combineGifData () {
    return this.props.framesOrder.map(
      el => this.props.gifFramesData[el]
    ).join('');
  }

  confirm () {
    const combinedData = this.combineGifData();
    let spritesImageDataArray;

    Downloader.asGIF(combinedData);
    if (this.state.includeProject) this.props.downloadProject('project.pxlsh');
    if (this.state.includeSpritesheet) {
      spritesImageDataArray = this.props.framesOrder.map(
        el => this.props.framesCollection[el].naturalImageData
      );
      Downloader.canvasAsPNG(
        combineImageDataToCanvas(
          spritesImageDataArray,
          spritesImageDataArray[0].width,
          spritesImageDataArray[0].height
        ),
        'sprites.png'
      );
    }
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

        <ToggleCheckbox
          value={this.state.includeSpritesheet}
          onChange={this.includeSpritesheetToggle.bind(this)}>Include spritesheet</ToggleCheckbox>
        <ToggleCheckbox>Include custom palette</ToggleCheckbox>
        <ToggleCheckbox
          value={this.state.includeProject}
          onChange={this.includeProjectToggle.bind(this)}>Include project</ToggleCheckbox>

      </ModalWindow>
    );
  }
}

export default DownloadProjectModal;
