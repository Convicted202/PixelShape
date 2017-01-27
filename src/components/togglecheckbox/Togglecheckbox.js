import './togglecheckbox.styl';

import React from 'react';
import classNames from 'classnames';

const ToggleCheckbox = props => {
  const classes = classNames(
    'togglecheckbox',
    props.className
  );

  return (
    <div className={classes}>
      <input
        className="togglecheckbox__switch"
        type="checkbox"
        checked={props.value}
        onChange={props.onChange} />
      <span>{props.children}</span>
    </div>
  );
};

export default ToggleCheckbox;
