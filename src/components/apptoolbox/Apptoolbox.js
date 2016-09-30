import './apptoolbox.styl';

import React, { Component } from 'react';

import FileSaver from 'file-saver';

class Apptoolbox extends Component {

  constructor(...args) {
    super(...args);
  }

  downloadGIF() {
    const byteChars = this.props.gifFramesArray.join(''),
          len = byteChars.length,
          bytes = new Array(len);

    let i = 0, blob = null;

    for (; i < len; i++) {
        bytes[i] = byteChars.charCodeAt(i);
    }

    blob = new Blob([new Uint8Array(bytes)], {type: 'image/gif'});
    FileSaver.saveAs(blob, 'myGif.gif');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <aside className="apptoolbox">
        <ul className="apptoolbox__buttons">
          <li className="apptoolbox__buttons-button">
            <svg className="apptoolbox__buttons-button-icon" viewBox="0 0 24 24" width="30" height="30">
              <use xlinkHref="#new-project"></use>
            </svg>
          </li>
          <li className="apptoolbox__buttons-button">
            <svg className="apptoolbox__buttons-button-icon" viewBox="0 0 24 24" width="30" height="30">
              <use xlinkHref="#undo"></use>
            </svg>
          </li>
          <li className="apptoolbox__buttons-button">
            <svg className="apptoolbox__buttons-button-icon" viewBox="0 0 24 24" width="30" height="30">
              <use xlinkHref="#redo"></use>
            </svg>
          </li>
          <li className="apptoolbox__buttons-button" onClick={this.downloadGIF.bind(this)}>
            <svg className="apptoolbox__buttons-button-icon" viewBox="0 0 24 24" width="30" height="30">
              <use xlinkHref="#download"></use>
            </svg>
          </li>
        </ul>
      </aside>
    )
  }
}

export default Apptoolbox;
