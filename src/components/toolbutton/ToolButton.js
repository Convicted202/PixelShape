import './toolbutton.styl';

import React from 'react';
import classNames from 'classnames';

const ToolButton = props => {
  const classes = classNames(
    'toolbutton',
    'tooltip-right',
    {
      'active': props.isActive
    });

  return (
    <li className={classes} onClick={props.setTool} data-tooltip={props.btnTooltip}>
      <svg className="toolbutton__icon" viewBox="0 0 24 24" width="40" height="40">
        <use xlinkHref={`#${props.icon}`}></use>
      </svg>
    </li>
  );
};

export default ToolButton;
