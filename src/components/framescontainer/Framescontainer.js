import './framescontainer.styl';

import React, { Component } from 'react';
import Frame from 'components/frame/Frame';

class FrameButton extends Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div className="framescontainer">
        <div className="framescontainer__gif-container">
          <div className="framescontainer__gif"></div>
        </div>
        <div className="framescontainer__frames">
          <Frame isActive="true" />
          <Frame />
          <Frame />
          <div className="framescontainer__frames-addframe">
            <svg className="framescontainer__frames-addframe__icon" viewBox="0 0 24 24" width="40" height="40">
              <use xlinkHref="#plus"></use>
            </svg>
          </div>
        </div>
      </div>
    )
  }
}

export default FrameButton;
