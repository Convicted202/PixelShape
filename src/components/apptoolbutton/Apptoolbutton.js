import './apptoolbutton.styl';

import React from 'react';
import classNames from 'classnames';

const AppToolButton = props => {
  const classes = classNames(
    'apptoolbutton',
    'tooltip-bottom',
    {
      'apptoolbutton--disabled': props.disabled
    }
  );

  return (
    <li className={classes} onClick={props.doAction} data-tooltip={props.btnTooltip} data-shortcut={props.btnShortcut} data-multiline-tooltip>
      <svg className="apptoolbutton__icon" viewBox="0 0 24 24" width={props.width} height={props.height}>
        <use xlinkHref={`#${props.icon}`}></use>
      </svg>
    </li>
  );
};

export default AppToolButton;
