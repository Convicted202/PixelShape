import './toolbutton.styl';

import React, { Component } from 'react';
import classNames from 'classnames';

class ToolButton extends Component {
  constructor(...args) {
    super(...args);
  }

  onClick() {
    this.props.setTool();
  }

  render() {
    const classes = classNames('toolbutton tooltip-right', this.props.isActive ? 'active' : '');

    return (
      <li className={classes} onClick={this.onClick.bind(this)} data-tooltip={this.props.btnTooltip}>
        <svg className="toolbutton__icon" viewBox="0 0 24 24" width="40" height="40">
          <use xlinkHref={`#${this.props.icon}`}></use>
        </svg>
      </li>
    )
  }
}

export default ToolButton;
