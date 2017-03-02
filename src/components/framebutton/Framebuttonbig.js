import './framebutton.styl';

import React from 'react';

const FrameButtonBig = props => (
  <li className="framebutton framebutton-big tooltip-top" onClick={props.doAction} data-tooltip={props.btnTooltip}>
    <svg className="framebutton__icon framebutton-big__icon" viewBox="0 0 32 32" width="32" height="32">
      <use xlinkHref={`#${props.icon}`}></use>
    </svg>
  </li>
);

export default FrameButtonBig;
