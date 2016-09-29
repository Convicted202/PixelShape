import './apptoolbox.styl';

import React, { Component } from 'react';

class Apptoolbox extends Component {

  constructor(...args) {
    super(...args);
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
          <li className="apptoolbox__buttons-button">
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
