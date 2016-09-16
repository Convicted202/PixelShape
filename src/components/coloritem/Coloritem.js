import './coloritem.styl';

import React, { Component } from 'react';

class Coloritem extends Component {
  render() {
    return (
      <div
        className="color"
        style={{
          backgroundColor: this.props.color,
          color: this.props.color
        }}>
        {this.props.children}
      </div>
    )
  }
}

export default Coloritem;
