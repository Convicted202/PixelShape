import './modalwindow.styl';

import React from 'react';
import classNames from 'classnames';

const ModalWindow = props => {
  const classes = classNames(
    'modalwindow',
    {
      'shown': props.isShown
    });

  return (
    <div className={classes}>
      <header>{props.title}</header>
      <section>
        {props.children}
      </section>
      <footer>
        <button onClick={props.cancel.action}>{props.cancel.text}</button>
        <button onClick={props.ok.action}>{props.ok.text}</button>
      </footer>
    </div>
  );
};

export default ModalWindow;
