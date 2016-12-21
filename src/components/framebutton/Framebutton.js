import './framebutton.styl';

import React from 'react';

const FrameButton = props => (
  <li className="framebutton tooltip-top" onClick={props.doAction} data-tooltip={props.btnTooltip}>
    <svg className="framebutton__icon" viewBox="0 0 24 24" width="24" height="24">
      <use xlinkHref={`#${props.icon}`}></use>
    </svg>
  </li>
);

export default FrameButton;
