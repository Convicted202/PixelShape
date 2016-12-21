import './coloritem.styl';

import React from 'react';
import classNames from 'classnames';

const Coloritem = props => {
  const classes = classNames(
    'color',
    {
      'active': props.isActive
    });

  return (
    <div
      className={classes}
      style={{
        backgroundColor: props.color,
        color: props.color
      }}
      onClick={props.setColor}>
      {props.children}
    </div>
  );
};

export default Coloritem;
