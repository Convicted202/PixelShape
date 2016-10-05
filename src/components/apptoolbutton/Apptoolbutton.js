import './apptoolbutton.styl';

import React from 'react';

const AppToolButton = props => (
  <li className='apptoolbutton tooltip-bottom' onClick={props.doAction} data-tooltip={props.btnTooltip}>
    <svg className="apptoolbutton__icon" viewBox="0 0 24 24" width={props.width} height={props.height}>
      <use xlinkHref={`#${props.icon}`}></use>
    </svg>
  </li>
)

export default AppToolButton;
