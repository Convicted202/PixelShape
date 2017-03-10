import './framebutton.styl';

import React from 'react';

const FrameButtonBig = props => (
  <li className="framebutton framebutton-big tooltip-top" onClick={props.doAction} data-tooltip={props.btnTooltip} data-shortcut={props.btnShortcut}>
    <svg className="framebutton__icon framebutton-big__icon" viewBox="0 0 32 32" width="24" height="24">
      <use xlinkHref={`#${props.icon}`}></use>
    </svg>
  </li>
);

export default FrameButtonBig;
