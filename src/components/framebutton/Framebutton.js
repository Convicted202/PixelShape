import './framebutton.styl';

import React, { Component } from 'react';

class FrameButton extends Component {
  constructor(...args) {
    super(...args);
  }

  onClick() {
    this.props.doAction();
  }

  render() {
    return (
      <li className="framebutton tooltip-top" onClick={this.onClick.bind(this)} data-tooltip={this.props.btnTooltip}>
        <svg className="framebutton__icon" viewBox="0 0 24 24" width="24" height="24">
          <use xlinkHref={`#${this.props.icon}`}></use>
        </svg>
      </li>
    )
  }
}

export default FrameButton;
