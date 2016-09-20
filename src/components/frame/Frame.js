import './frame.styl';

import React, { Component } from 'react';
import classNames from 'classnames';

class Frame extends Component {
  constructor(...args) {
    super(...args);
  }

  onClick() {
    this.props.setActive();
  }

  render() {
    const classes = classNames('frame', this.props.isActive ? 'active' : '');

    return (
      <div
        className={classes}
        onClick={this.onClick.bind(this)} >
        <span className="frame__index">{this.props.index}</span>
      </div>
    )
  }
}

export default Frame;
