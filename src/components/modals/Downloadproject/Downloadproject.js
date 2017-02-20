import React, { Component } from 'react';
import ModalWindow from '../../modalwindow/Modalwindow';
import ToggleCheckbox from '../../togglecheckbox/Togglecheckbox';

import Downloader from '../../../fileloaders/Downloader';
import { combineImageDataToCanvas, combineColorPaletteToCanvas } from '../../../utils/canvasUtils';
import { getAllActiveColors } from '../../../utils/colorUtils';

class DownloadProjectModal extends Component {
  constructor (props) {
    super(props);
  }

  combineGifData () {
    return this.props.framesOrder.map(
      el => this.props.gifFramesData[el]
    ).join('');
  }

  downloadGif () {
    const combinedData = this.combineGifData();
    Downloader.asGIF(combinedData);
  }

  downloadProject () {
    this.props.downloadProject('project.pxlsh');
  }

  downloadSpritesheet () {
    const spritesImageDataArray = this.props.framesOrder.map(
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

  downloadPalette () {
    const spritesImageDataArray = this.props.framesOrder.map(
      el => this.props.framesCollection[el].naturalImageData
    );
    Downloader.canvasAsPNG(
      combineColorPaletteToCanvas(
        getAllActiveColors(spritesImageDataArray),
        100,
        500
      ),
      'palette.png'
    );
  }

  confirm () {
    if (this.props.includeGif) this.downloadGif();
    if (this.props.includePalette) this.downloadPalette();
    if (this.props.includeProject) this.downloadProject();
    if (this.props.includeSpritesheet) this.downloadSpritesheet();
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
          value={this.props.includeGif}
          onChange={this.props.toggleIncludeGif.bind(this)}>Include gif</ToggleCheckbox>
        <ToggleCheckbox
          value={this.props.includeSpritesheet}
          onChange={this.props.toggleIncludeSpritesheet.bind(this)}>Include spritesheet</ToggleCheckbox>
        <ToggleCheckbox
          value={this.props.includePalette}
          onChange={this.props.toggleIncludePalette.bind(this)}>Include custom palette</ToggleCheckbox>
        <ToggleCheckbox
          value={this.props.includeProject}
          onChange={this.props.toggleIncludeProject.bind(this)}>Include project</ToggleCheckbox>

      </ModalWindow>
    );
  }
}

export default DownloadProjectModal;
