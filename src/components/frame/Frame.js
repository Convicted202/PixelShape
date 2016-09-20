import './frame.styl';

import React, { Component } from 'react';
import classNames from 'classnames';

class Frame extends Component {
  constructor(...args) {
    super(...args);
  }

  onClick() {

  }

  render() {
    const classes = classNames('frame', this.props.isActive ? 'active' : '');

    return (
      <div
        className={classes}
        onClick={this.onClick.bind(this)} ></div>
    )
  }
}

export default Frame;
