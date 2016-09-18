import './coloritem.styl';

import React, { Component } from 'react';
import classNames from 'classnames';

class Coloritem extends Component {
  onClick() {
    this.props.setColor(this.props.color);
  }

  render() {
    const classes = classNames('color', this.props.isActive ? 'active' : '');

    return (
      <div
        className={classes}
        style={{
          backgroundColor: this.props.color,
          color: this.props.color
        }}
        onClick={this.onClick.bind(this)}>
        {this.props.children}
      </div>
    )
  }
}

export default Coloritem;
