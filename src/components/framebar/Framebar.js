import './framebar.styl';

import React, { Component } from 'react';
import FrameButton from 'components/framebutton/FrameButton';
import FramesContainer from 'components/framescontainer/FramesContainer';

class Framebar extends Component {
  render() {
    return (
      <aside className="framebar">
        <div className="framebar__controls">
          <div className="framebar__gif-controls">
            <input
              className="framebar__gif-slider"
              type="range" step="10" min="10" max="100"
              defaultValue={10} />
          </div>
          <ul className="framebar__frames-controls">
            <FrameButton icon="duplicate" />
            <FrameButton icon="remove" />
            <FrameButton icon="move-left" />
            <FrameButton icon="move-right" />
          </ul>
        </div>
        <FramesContainer />
      </aside>
    )
  }
}

export default Framebar;
