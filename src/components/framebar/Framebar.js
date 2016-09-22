import './framebar.styl';

import React, { Component } from 'react';
import FrameButton from 'components/framebutton/FrameButton';
import FramesContainer from 'containers/framescontainer/FramesContainer';

class Framebar extends Component {

  updateIndexesOnRemove(newFrameUUID) {
    const collection = this.props.framesCollection;
    Object.keys(collection)
      .forEach(frameUUID => {
        if (collection[frameUUID].index > collection[newFrameUUID].index) {
          this.props.updateFrameIndex(frameUUID, collection[frameUUID].index - 1);
        }
      });
  }

  removeCurrentFrame() {
    const currentUUID = this.props.currentFrameUUID,
          currentFrameIndex = this.props.framesCollection[currentUUID].index,
          col = this.props.framesCollection,
          nextFrame = Object.keys(col)
                        .find(el => {
                          if (el === this.props.currentFrameUUID) return false;
                          // first try taking the frame to the left if exists and then to the right
                          if (currentFrameIndex - col[el].index === 1) return true;
                          if (col[el].index - currentFrameIndex === 1) return true;
                        });

    // no nextFrame means we have sole frame in the collection
    if (!nextFrame) return;
    this.updateIndexesOnRemove(currentUUID);
    this.props.setCurrentFrame(nextFrame);
    this.props.removeFrame(currentUUID);
  }

  render() {
    return (
      <aside className="framebar">
        <div className="framebar__controls">
          <div className="framebar__gif-controls">
            <input
              className="framebar__gif-slider"
              type="range" step="1" min="0" max="24"
              defaultValue={2} />
          </div>
          <ul className="framebar__frames-controls">
            <FrameButton icon="duplicate" />
            <FrameButton
              icon="remove"
              doAction={this.removeCurrentFrame.bind(this)} />
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
