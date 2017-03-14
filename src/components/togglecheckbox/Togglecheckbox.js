import './togglecheckbox.styl';

import React, { Component } from 'react';
import classNames from 'classnames';

// this is needed to reference input from label
// so we will increase it in constructor to keep unique
let id = 0;

class ToggleCheckbox extends Component {
  constructor (...props) {
    id++;
    super(...props);
    this.state = { id };
  }

  render () {
    const classes = classNames(
      'togglecheckbox',
      this.props.className
    );

    return (
      <div className={classes}>
        <input
          className="togglecheckbox-checkbox"
          type="checkbox"
          id={`togglecheckbox-${this.state.id}`}
          checked={this.props.value}
          onChange={this.props.onChange} />
        <label className="togglecheckbox-checkbox__switch" htmlFor={`togglecheckbox-${this.state.id}`} />
        <span className="togglecheckbox-checkbox__text">{this.props.children}</span>
      </div>
    );
  }
}

export default ToggleCheckbox;
