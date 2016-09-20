import './framebutton.styl';

import React, { Component } from 'react';

class FrameButton extends Component {
  constructor(...args) {
    super(...args);
  }

  onClick() {

  }

  render() {
    return (
      <li className="framebutton" onClick={this.onClick.bind(this)}>
        <svg className="framebutton__icon" viewBox="0 0 24 24" width="24" height="24">
          <use xlinkHref={`#${this.props.icon}`}></use>
        </svg>
      </li>
    )
  }
}

export default FrameButton;
