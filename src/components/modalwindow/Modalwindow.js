import './modalwindow.styl';

import React, { Component } from 'react';
import classNames from 'classnames';

class ModalWindow extends Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    const classes = classNames('modalwindow', this.props.isShown ? 'shown' : '');

    return (
      <div className={classes}>
        <header>{this.props.title}</header>
        <section>
          {this.props.children}
        </section>
        <footer>
          <button onClick={this.props.cancel.action}>{this.props.cancel.text}</button>
          <button onClick={this.props.ok.action}>{this.props.ok.text}</button>
        </footer>
      </div>
    )
  }
}

export default ModalWindow;
