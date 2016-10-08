import './togglecheckbox.styl';

import React from 'react';

const ToggleCheckbox = props => (
  <div className="togglecheckbox">
    <input
      className="togglecheckbox__switch"
      type="checkbox"
      checked={props.value}
      onChange={props.onChange} />
    <span>{props.children}</span>
  </div>
);

export default ToggleCheckbox;
