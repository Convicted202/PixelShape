import './togglecheckbox.styl';

import React from 'react';

const ToggleCheckbox = props => (
  <div className="togglecheckbox">
    <input
      className="togglecheckbox__switch"
      type="checkbox"
      defaultValue={props.default || 'off'} />
    <span>{props.children}</span>
  </div>
)

export default ToggleCheckbox;
