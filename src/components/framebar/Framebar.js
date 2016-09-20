import './framebar.styl';

import React, { Component } from 'react';
import FrameButton from 'components/framebutton/FrameButton';
import FramesContainer from 'components/framescontainer/FramesContainer';

class Framebar extends Component {
  render() {
    return (
      <aside className="framebar">
        <div className="framebar__frames-controls">
          <FrameButton icon="duplicate" />
          <FrameButton icon="remove" />
          <FrameButton icon="move-left" />
          <FrameButton icon="move-right" />
        </div>
        <FramesContainer />
      </aside>
    )
  }
}

export default Framebar;
